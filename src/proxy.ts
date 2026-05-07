import { NextResponse, type NextRequest } from "next/server";

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

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const bypass = request.headers.get("x-markdown-bypass") === "1";

  if (!bypass && request.method === "GET" && acceptsMarkdown(request) && isHtmlCandidate(pathname)) {
    const markdownUrl = new URL("/md", request.url);
    markdownUrl.searchParams.set("url", `${pathname}${search}`);
    return NextResponse.rewrite(markdownUrl);
  }

  const response = NextResponse.next();

  if (pathname === "/") {
    response.headers.append("Link", '</.well-known/api-catalog>; rel="api-catalog"');
    response.headers.append("Link", '</docs/api>; rel="service-doc"');
    response.headers.append("Link", '</sitemap.xml>; rel="sitemap"');
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
