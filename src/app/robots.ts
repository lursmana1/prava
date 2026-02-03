import type { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/site-metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    host: siteMetadata.url,
    sitemap: `${siteMetadata.url}/sitemap.xml`,
  };
}
