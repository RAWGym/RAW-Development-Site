import type { MetadataRoute } from "next";
import { allCases } from "@/content/cases";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/work", "/process", "/about", "/contact", "/start", "/stack", "/notes"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...allCases.map((c) => ({ url: `${siteUrl}/work/${c.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
