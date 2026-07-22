import { cache } from "react";
import prisma from "@/lib/prisma";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface HomepageSectionData {
  sectionKey: string;
  title?: string | null;
  content: string;
  metadata?: Record<string, unknown> | null;
}

/**
 * Cached query to fetch active FAQs ordered by position.
 */
export const getFaqs = cache(async (): Promise<FaqItem[]> => {
  try {
    const faqs = await prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    return faqs;
  } catch (error) {
    console.error("Failed to fetch FAQs, returning empty fallback array:", error);
    return [];
  }
});

/**
 * Cached query to fetch a specific homepage section by its unique sectionKey.
 */
export const getHomepageSection = cache(
  async (sectionKey: string): Promise<HomepageSectionData | null> => {
    try {
      const section = await prisma.homepageSection.findUnique({
        where: { sectionKey, isActive: true },
      });
      if (!section) return null;
      return {
        sectionKey: section.sectionKey,
        title: section.title,
        content: section.content,
        metadata: (section.metadata as Record<string, unknown>) || null,
      };
    } catch (error) {
      console.error(`Failed to fetch section ${sectionKey}:`, error);
      return null;
    }
  }
);

/**
 * Cached query to fetch all active homepage sections.
 */
export const getAllHomepageSections = cache(
  async (): Promise<Record<string, HomepageSectionData>> => {
    try {
      const sections = await prisma.homepageSection.findMany({
        where: { isActive: true },
      });
      const sectionMap: Record<string, HomepageSectionData> = {};
      sections.forEach((sec: { sectionKey: string; title: string | null; content: string; metadata: unknown }) => {
        sectionMap[sec.sectionKey] = {
          sectionKey: sec.sectionKey,
          title: sec.title,
          content: sec.content,
          metadata: (sec.metadata as Record<string, unknown>) || null,
        };
      });
      return sectionMap;
    } catch (error) {
      console.error("Failed to fetch homepage sections:", error);
      return {};
    }
  }
);
