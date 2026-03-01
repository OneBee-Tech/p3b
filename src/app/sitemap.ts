import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

// Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://onedollaronechild.org';

    // 1. Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${siteUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${siteUrl}/programs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${siteUrl}/impact`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ];

    // 2. Fetch active children (Strict Safeguarding filters)
    const children = await prisma.registryChild.findMany({
        where: {
            deletedAt: null,
            isArchived: false,
            privacyMode: 'PUBLIC', // Only globally visible children
        },
        select: { id: true, updatedAt: true }
    });

    const childRoutes: MetadataRoute.Sitemap = children.map(child => ({
        url: `${siteUrl}/programs/${child.id}`,
        lastModified: child.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    // 3. Fetch published Impact Stories
    const stories = await prisma.impactStory.findMany({
        where: {
            status: 'PUBLISHED',
            publishAt: { lte: new Date() }
        },
        select: { id: true, updatedAt: true }
    });

    const storyRoutes: MetadataRoute.Sitemap = stories.map(story => ({
        url: `${siteUrl}/stories/${story.id}`,
        lastModified: story.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticRoutes, ...childRoutes, ...storyRoutes];
}
