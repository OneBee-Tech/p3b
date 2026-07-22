import { cache } from "react";
import prisma from "@/lib/prisma";

export interface GlobalSettingsData {
  organizationName: string;
  registeredOffice: string;
  contactEmails: {
    info: string;
    sponsor: string;
    partnerships: string;
    volunteer: string;
    safeguarding: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  craStatus: string;
  missionStatement: string;
  visionStatement: string;
  transparencyWording: string;
}

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettingsData = {
  organizationName: "One Dollar. One Child. One Future.",
  registeredOffice: "3211 Bloomfield Drive, Mississauga, Ontario L5N 6V2, Canada",
  contactEmails: {
    info: "info@onedollaronechild.org",
    sponsor: "sponsor@onedollaronechild.org",
    partnerships: "partnerships@onedollaronechild.org",
    volunteer: "volunteer@onedollaronechild.org",
    safeguarding: "safeguarding@onedollaronechild.org",
  },
  socialLinks: {
    facebook: "https://facebook.com/onedollaronechild",
    instagram: "https://instagram.com/onedollaronechild",
    linkedin: "https://linkedin.com/company/onedollaronechild",
  },
  craStatus: "Official charitable tax receipts are available after CRA charitable registration and receipting eligibility have been formally confirmed.",
  missionStatement: "To provide children from financially vulnerable families with access to dependable education by connecting them with caring sponsors, verified schools and transparent education-support systems.",
  visionStatement: "A world where no deserving child is prevented from learning because their family cannot afford basic education costs.",
  transparencyWording: "Every contribution supports our educational mission. We keep program and operating costs responsible, document their use and report them transparently.",
};

/**
 * Server-side cached query to fetch GlobalSettings from DB with fallback defaults.
 * Uses React cache() for request-deduplication.
 */
export const getGlobalSettings = cache(async (): Promise<GlobalSettingsData> => {
  try {
    const settings = await prisma.globalSettings.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    if (!settings) {
      return DEFAULT_GLOBAL_SETTINGS;
    }

    return {
      organizationName: settings.organizationName || DEFAULT_GLOBAL_SETTINGS.organizationName,
      registeredOffice: settings.registeredOffice || DEFAULT_GLOBAL_SETTINGS.registeredOffice,
      contactEmails: (settings.contactEmails as GlobalSettingsData["contactEmails"]) || DEFAULT_GLOBAL_SETTINGS.contactEmails,
      socialLinks: (settings.socialLinks as GlobalSettingsData["socialLinks"]) || DEFAULT_GLOBAL_SETTINGS.socialLinks,
      craStatus: settings.craStatus || DEFAULT_GLOBAL_SETTINGS.craStatus,
      missionStatement: settings.missionStatement || DEFAULT_GLOBAL_SETTINGS.missionStatement,
      visionStatement: settings.visionStatement || DEFAULT_GLOBAL_SETTINGS.visionStatement,
      transparencyWording: settings.transparencyWording || DEFAULT_GLOBAL_SETTINGS.transparencyWording,
    };
  } catch (error) {
    console.error("Failed to fetch GlobalSettings from database, falling back to defaults:", error);
    return DEFAULT_GLOBAL_SETTINGS;
  }
});
