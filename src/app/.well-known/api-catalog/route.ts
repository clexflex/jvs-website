export async function GET() {
  const payload = {
    name: "JVS Enterprises API Catalog",
    description: "API discovery links and service docs for agent clients.",
    links: [
      {
        rel: "service-doc",
        href: "https://www.jvsenterprises.co.in/docs/api",
        title: "Human-readable service documentation",
      },
      {
        rel: "sitemap",
        href: "https://www.jvsenterprises.co.in/sitemap.xml",
        title: "Website XML sitemap",
      },
    ],
  };

  return Response.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
