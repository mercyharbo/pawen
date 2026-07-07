import type { Metadata } from "next";

export const siteConfig = {
  name: "The PAWEN Awards & Summit 2026",
  description:
    "Africa's premier awards, summit, exhibition, and gala platform for women's economic leadership.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pawen.org").replace(
    /\/$/,
    "",
  ),
  ogImage: "/opengraph-image",
  twitterImage: "/twitter-image",
};

type SeoMetadataInput = {
  description?: string;
  path?: string;
  title?: string;
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function titleWithTemplate(title?: string) {
  if (!title || title === siteConfig.name) {
    return siteConfig.name;
  }

  return `${title} | ${siteConfig.name}`;
}

export function createPageMetadata({
  description = siteConfig.description,
  path = "/",
  title,
}: SeoMetadataInput = {}): Metadata {
  const fullTitle = titleWithTemplate(title);

  return {
    title: title ?? siteConfig.name,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteConfig.twitterImage],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  creator: "PAWEN",
  publisher: "PAWEN",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.twitterImage],
  },
};
