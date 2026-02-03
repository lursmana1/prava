export type SiteMetadata = {
  name: string;
  title: string;
  description: string;
  shortTitle?: string;
  url: string;
  locale: string;
  creator: string;
  twitterHandle?: string;
  keywords: string[];
};

export const siteMetadata: SiteMetadata = {
  // TODO: replace with your product, company, or site name.
  name: "Your Product Name",
  // TODO: replace with the full page title that should appear in search results.
  title: "Your Product Name | Core Value Proposition",
  // Optional: shorter title used when composing <title> with page-specific segments.
  shortTitle: "Your Product Name",
  // TODO: replace with a concise marketing description (150–160 chars recommended).
  description:
    "Concise sentence describing what your product or service does and why it matters.",
  // TODO: replace with the production base URL (must include protocol).
  url: "https://www.example.com",
  // TODO: replace with the primary locale for the site (format: language_TERRITORY).
  locale: "en_US",
  // TODO: replace with the individual or organization responsible for the site.
  creator: "Example Inc.",
  // Optional: replace with your Twitter/X handle including @.
  twitterHandle: "@example",
  keywords: [
    // TODO: list 5–10 SEO keywords or phrases relevant to the business.
    "primary keyword",
    "supporting keyword",
    "brand name",
    "industry term",
    "target audience need",
  ],
};
