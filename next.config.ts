import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '4.5mb',
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.ctfassets.net',
        protocol: 'https',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/delegates',
        destination: '/delegates-information-pack.pdf',
      },
    ]
  },
  async redirects() {
    const FORM_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLSeXj1rBizXExksssfE4GRf4BXpYNIIWmYAq9jz-v7I283v-Dg/viewform?usp=header'
    const VOLUNTEERS_FORM_URL =
      'https://docs.google.com/forms/d/e/1FAIpQLScjCkOVzEahAn2ht-LTDGOpQPkwuJWL7oM_jTZ_rIJyzeWTyQ/viewform?usp=dialog'
    return [
      {
        source: '/summitbrochure',
        destination:
          'https://drive.google.com/file/d/1zuUGVdxG00oRhbSDaGLqokDXb7U27XPv/view?usp=sharing',
        permanent: false,
      },
      {
        source: '/volunteers',
        destination: VOLUNTEERS_FORM_URL,
        permanent: false,
      },
      {
        source: '/Volunteers',
        destination: VOLUNTEERS_FORM_URL,
        permanent: false,
      },
      {
        source: '/volunteer',
        destination: VOLUNTEERS_FORM_URL,
        permanent: false,
      },
      {
        source: '/Volunteer',
        destination: VOLUNTEERS_FORM_URL,
        permanent: false,
      },
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
    ]
  },
}

export default nextConfig
