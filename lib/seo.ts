import type { Metadata } from "next";

const sharedKeywords = [
  "PAWEN",
  "The PAWEN Awards & Summit 2026",
  "PAWEN Awards",
  "PAWEN Summit",
  "women entrepreneurs",
  "women in business",
  "women leaders",
  "African women",
  "women economic leadership",
  "Africa awards",
  "business summit",
  "business exhibition",
  "award gala",
  "Zambia",
  "Lusaka",
  "leadership",
  "networking",
  "business growth",
];

export const siteConfig = {
  name: "The PAWEN Awards & Summit 2026",
  description:
    "The PAWEN Awards & Summit 2026 brings together women entrepreneurs, business leaders, partners, and changemakers across Africa for awards, summit sessions, exhibitions, and gala experiences in Lusaka, Zambia.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pawen.org").replace(
    /\/$/,
    "",
  ),
  ogImage: "/images/og-image.png",
  twitterImage: "/images/og-image.png",
  keywords: sharedKeywords,
};

type SeoMetadataInput = {
  description?: string;
  keywords?: string[];
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
  keywords = [],
  path = "/",
  title,
}: SeoMetadataInput = {}): Metadata {
  const fullTitle = titleWithTemplate(title);
  const pageKeywords = Array.from(
    new Set([...siteConfig.keywords, ...keywords]),
  );

  return {
    title: title ?? siteConfig.name,
    description,
    keywords: pageKeywords,
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
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
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  creator: "PAWEN",
  publisher: "PAWEN",
  category: "Events",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
