import { NextRequest } from "next/server";

function htmlToMarkdown(html: string) {
  let out = html;

  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<style[\s\S]*?<\/style>/gi, "");
  out = out.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");

  out = out.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  out = out.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  out = out.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");
  out = out.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1");
  out = out.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  out = out.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n$1\n");
  out = out.replace(/<br\s*\/?>/gi, "\n");
  out = out.replace(/<[^>]+>/g, " ");

  out = out
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return out;
}

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url") || "/";
  const origin = request.nextUrl.origin;
  const sourceUrl = new URL(target, origin);

  const htmlResponse = await fetch(sourceUrl, {
    headers: {
      accept: "text/html",
      "x-markdown-bypass": "1",
    },
    cache: "no-store",
  });

  if (!htmlResponse.ok) {
    return new Response("# Not Found\n\nUnable to render markdown for this path.", {
      status: htmlResponse.status,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  }

  const html = await htmlResponse.text();
  const markdown = htmlToMarkdown(html);
  const tokenEstimate = markdown.split(/\s+/).filter(Boolean).length;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokenEstimate),
      "Vary": "Accept",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
