// next.config.js or next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // ... any other existing config
  }
  
  module.exports = nextConfig