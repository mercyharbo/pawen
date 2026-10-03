import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb",
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.ctfassets.net",
        protocol: "https",
      },
    ],
  },
  async redirects() {
    const FORM_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLScL3ITO0sFmPcVW-JjjYrAFpjENZULDvyYHCil68psBEjvj9A/viewform?usp=dialog';
    return [
      {
        source: '/Maleaalies',
        destination: FORM_URL,
        permanent: false,
      },
      {
        source: '/maleaalies',
        destination: FORM_URL,
        permanent: false,
      },
      {
        source: '/Maleallies',
        destination: FORM_URL,
        permanent: false,
      },
      {
        source: '/maleallies',
        destination: FORM_URL,
        permanent: false,
      },
      {
        source: '/male-allies',
        destination: FORM_URL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
