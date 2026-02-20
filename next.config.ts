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
    ];
  },
};

export default nextConfig;
