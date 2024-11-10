import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['image.mux.com'], // Add Mux's image domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.mux.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
