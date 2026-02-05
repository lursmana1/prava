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
  name: "prava.ge",
  // TODO: replace with the full page title that should appear in search results.
  title: "prava.ge | სასწავლო პლატფორმა საქართველოში",
  // Optional: shorter title used when composing <title> with page-specific segments.
  shortTitle: "prava.ge",
  // TODO: replace with a concise marketing description (150–160 chars recommended).
  description: "პრავა.გე - სასწავლო პლატფორმა საქართველოში",
  // TODO: replace with the production base URL (must include protocol).
  url: "https://prava.ge",
  // TODO: replace with the primary locale for the site (format: language_TERRITORY).
  locale: "ka_GE",
  // TODO: replace with the individual or organization responsible for the site.
  creator: "prava.ge",
  // Optional: replace with your Twitter/X handle including @.
  twitterHandle: "@prava.ge",
  keywords: [
    // TODO: list 5–10 SEO keywords or phrases relevant to the business.
    "სასწავლო პლატფორმა",
    "მართვის მოწმობა",
    "სასწავლო პლატფორმა საქართველოში",
    "მართვის მოწმობა საქართველოში",
    "prava",
    "პრავა",
    "prava.ge",
  ],
};
