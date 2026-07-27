import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

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
    // AVIF typically produces smaller payloads than JPEG/WebP depending on image content
    formats: ['image/avif', 'image/webp'],
    // 30-day CDN cache for optimized images
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // Google OAuth profile images used in Navbar & Dashboard
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  experimental: {
    // Tree-shakes barrel imports — only bundles icons/components actually used
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  compiler: {
    // Strips console.log/console.warn from production client bundles
    // console.error is preserved for runtime error visibility
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error'] }
      : false,
  },
};

export default bundleAnalyzer(nextConfig);
