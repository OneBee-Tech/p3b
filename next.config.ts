import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/sponsor',
        destination: '/programs',
        permanent: true,
      },
      {
        source: '/sponsor/:path*',
        destination: '/programs/:path*',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: "/stories",
        destination: "/impact",
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
