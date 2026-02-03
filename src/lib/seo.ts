import type { Metadata, Viewport } from "next";
import { siteMetadata } from "./site-metadata";

type MetadataInput = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: Metadata["openGraph"];
};

// TODO: replace `social/share.jpg` with the path to your actual social share image.
const defaultImages = [
  {
    url: `${siteMetadata.url}/social/share.jpg`,
    width: 1200,
    height: 630,
    alt: `${siteMetadata.shortTitle ?? siteMetadata.name} social share image`,
  },
];

export const buildMetadata = ({
  title,
  description,
  keywords = siteMetadata.keywords,
  canonical,
  openGraph,
}: MetadataInput = {}): Metadata => {
  const resolvedTitle = title
    ? `${title} | ${siteMetadata.shortTitle ?? siteMetadata.name}`
    : siteMetadata.title;

  const resolvedDescription = description ?? siteMetadata.description;

  return {
    metadataBase: new URL(siteMetadata.url),
    title: resolvedTitle,
    description: resolvedDescription,
    keywords,
    applicationName: siteMetadata.name,
    creator: siteMetadata.creator,
    authors: [{ name: siteMetadata.creator }],
    alternates: {
      canonical: canonical ?? "/",
    },
    openGraph: {
      type: "website",
      locale: siteMetadata.locale,
      url: canonical ?? siteMetadata.url,
      title: resolvedTitle,
      siteName: siteMetadata.name,
      description: resolvedDescription,
      images: defaultImages,
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      site: siteMetadata.twitterHandle,
      creator: siteMetadata.twitterHandle,
      title: resolvedTitle,
      description: resolvedDescription,
      images: defaultImages.map((image) => image.url),
    },
  };
};

export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
};
