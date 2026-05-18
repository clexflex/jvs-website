import { NextResponse, type NextRequest } from "next/server";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const DEFAULT_INDEXNOW_KEY = "770cd318a6084274bf2aad47ee73cc06";
const DEFAULT_BATCH_SIZE = 500;
const MAX_BATCH_SIZE = 10_000;

type SubmitRequestBody = {
  sitemapUrl?: string;
  batchSize?: number;
  dryRun?: boolean;
};

function extractLocUrls(xml: string) {
  const urls: string[] = [];
  const locRegex = /<loc>([^<]+)<\/loc>/gi;

  for (const match of xml.matchAll(locRegex)) {
    const value = match[1]?.trim();
    if (!value) continue;

    try {
      const normalized = new URL(value).toString();
      urls.push(normalized);
    } catch {
      // Skip malformed URL entries from sitemap payload.
    }
  }

  return Array.from(new Set(urls));
}

function toBatches<T>(list: T[], size: number) {
  const batches: T[][] = [];
  for (let index = 0; index < list.length; index += size) {
    batches.push(list.slice(index, index + size));
  }
  return batches;
}

function isAuthorized(request: NextRequest) {
  const requiredToken = process.env.INDEXNOW_MANUAL_TOKEN;
  if (!requiredToken) return true;

  const headerToken = request.headers.get("x-indexnow-token");
  const queryToken = request.nextUrl.searchParams.get("token");

  return headerToken === requiredToken || queryToken === requiredToken;
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/indexnow/submit-sitemap",
    method: "POST",
    body: {
      sitemapUrl: "optional, defaults to /sitemap.xml on current host",
      batchSize: `optional, default ${DEFAULT_BATCH_SIZE}, max ${MAX_BATCH_SIZE}`,
      dryRun: "optional boolean to validate and count URLs without submitting",
    },
    auth: "Set INDEXNOW_MANUAL_TOKEN and send it as x-indexnow-token header (or ?token=...) to protect this endpoint.",
  });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const indexNowKey = process.env.INDEXNOW_KEY || DEFAULT_INDEXNOW_KEY;
  if (!indexNowKey) {
    return NextResponse.json({ error: "Missing INDEXNOW_KEY" }, { status: 500 });
  }

  let body: SubmitRequestBody = {};
  try {
    body = (await request.json()) as SubmitRequestBody;
  } catch {
    // Allow empty body.
  }

  const host = request.nextUrl.hostname;
  const sitemapUrl = body.sitemapUrl || new URL("/sitemap.xml", request.url).toString();
  const requestedBatch = Number(body.batchSize ?? DEFAULT_BATCH_SIZE);
  const batchSize = Math.max(1, Math.min(MAX_BATCH_SIZE, Number.isFinite(requestedBatch) ? requestedBatch : DEFAULT_BATCH_SIZE));

  const sitemapResponse = await fetch(sitemapUrl, {
    headers: {
      accept: "application/xml,text/xml;q=0.9,*/*;q=0.8",
    },
    cache: "no-store",
  });

  if (!sitemapResponse.ok) {
    return NextResponse.json(
      {
        error: "Failed to fetch sitemap",
        sitemapUrl,
        status: sitemapResponse.status,
      },
      { status: 502 },
    );
  }

  const xml = await sitemapResponse.text();
  const allUrls = extractLocUrls(xml);

  if (allUrls.length === 0) {
    return NextResponse.json(
      {
        error: "No URLs found in sitemap",
        sitemapUrl,
      },
      { status: 422 },
    );
  }

  if (body.dryRun) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      sitemapUrl,
      host,
      totalUrls: allUrls.length,
      batchSize,
      batchCount: Math.ceil(allUrls.length / batchSize),
      sample: allUrls.slice(0, 10),
    });
  }

  const batches = toBatches(allUrls, batchSize);
  const failures: Array<{ batch: number; status: number; message: string }> = [];

  for (let index = 0; index < batches.length; index += 1) {
    const urlList = batches[index];
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key: indexNowKey,
        keyLocation: `${request.nextUrl.origin}/${indexNowKey}.txt`,
        urlList,
      }),
    });

    if (!response.ok) {
      failures.push({
        batch: index + 1,
        status: response.status,
        message: (await response.text()) || "IndexNow submission failed",
      });
    }
  }

  const submittedBatches = batches.length - failures.length;

  return NextResponse.json(
    {
      ok: failures.length === 0,
      sitemapUrl,
      host,
      keyLocation: `${request.nextUrl.origin}/${indexNowKey}.txt`,
      totalUrls: allUrls.length,
      batchSize,
      batchCount: batches.length,
      submittedBatches,
      failedBatches: failures.length,
      failures,
    },
    { status: failures.length ? 207 : 200 },
  );
}
