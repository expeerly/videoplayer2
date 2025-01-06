import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['image.mux.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.mux.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_ENDPOINT_URL: process.env.NEXT_ENDPOINT_URL,
  },
};

export default withNextIntl(nextConfig);
