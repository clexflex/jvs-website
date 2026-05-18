import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "770cd318a6084274bf2aad47ee73cc06";
const SITE_HOST = "www.jvsenterprises.co.in";
const submittedIndexNowUrls = new Map<string, number>();
const INDEXNOW_CACHE_TTL_MS = 1000 * 60 * 60 * 6;

function acceptsMarkdown(request: NextRequest) {
  const accept = request.headers.get("accept")?.toLowerCase() ?? "";
  return accept.includes("text/markdown");
}

function isHtmlCandidate(pathname: string) {
  return (
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/assets") &&
    !pathname.startsWith("/images") &&
    !pathname.startsWith("/videos") &&
    !pathname.startsWith("/api") &&
    !pathname.includes(".")
  );
}

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname, search } = request.nextUrl;
  const bypass = request.headers.get("x-markdown-bypass") === "1";

  if (!bypass && request.method === "GET" && acceptsMarkdown(request) && isHtmlCandidate(pathname)) {
    const markdownUrl = new URL("/md", request.url);
    markdownUrl.searchParams.set("url", `${pathname}${search}`);
    return NextResponse.rewrite(markdownUrl);
  }

  if (
    request.method === "GET" &&
    !bypass &&
    isHtmlCandidate(pathname) &&
    request.nextUrl.hostname === SITE_HOST
  ) {
    event.waitUntil(notifyIndexNow(`${request.nextUrl.origin}${pathname}${search}`));
  }

  const response = NextResponse.next();

  if (pathname === "/") {
    response.headers.append("Link", '</.well-known/api-catalog>; rel="api-catalog"');
    response.headers.append("Link", '</docs/api>; rel="service-doc"');
    response.headers.append("Link", '</sitemap.xml>; rel="sitemap"');
  }

  return response;
}

async function notifyIndexNow(url: string) {
  const now = Date.now();
  const lastSentAt = submittedIndexNowUrls.get(url);
  if (lastSentAt && now - lastSentAt < INDEXNOW_CACHE_TTL_MS) {
    return;
  }

  submittedIndexNowUrls.set(url, now);
  for (const [knownUrl, knownAt] of submittedIndexNowUrls) {
    if (now - knownAt > INDEXNOW_CACHE_TTL_MS) {
      submittedIndexNowUrls.delete(knownUrl);
    }
  }

  try {
    await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: [url],
      }),
    });
  } catch {
    // IndexNow notification failures should not impact response serving.
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
