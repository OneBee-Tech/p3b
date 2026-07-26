import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://onedollaronechild.org';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/dashboard/',
          '/dashboard/*',
          '/signin',
          '/checkout/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
