# Component Inventory & Implementation Reference

This document tracks all reusable components, their classification (*Reuse / Extend / Refactor / Create*), props, data sources, and target pages.

---

## Component Inventory Matrix

| Component | Classification | Props & Interface | Data Source | Usage Pages |
| :--- | :--- | :--- | :--- | :--- |
| **`SectionHeader`** | **Create** | `eyebrow`, `title`, `subtitle`, `align` (left/center), `theme` (light/dark) | Props / Static / Dynamic | Home, Story, How It Works, Impact, Transparency, Corporate |
| **`StatisticCard`** | **Create** | `label`, `value`, `change`, `icon`, `subtext`, `theme` | Dynamic / Props | Home, Impact, Transparency, Corporate |
| **`Timeline` / `TimelineStep`** | **Create** | `steps: { title, description, stepNumber, icon }[]` | Props / Static | How It Works, Story |
| **`ContentBlock`** | **Create** | `title`, `body`, `imagePos` (left/right), `imageUrl`, `ctaText`, `ctaHref`, `theme` | HomepageSection / Props | Home, Story, How It Works, Corporate |
| **`Skeletons`** | **Create** | `variant` (hero, card, faq, stats) | Internal loading state | Global |
| **`Navbar`** | **Extend** | `navigationItems`, `ctaText` | `GlobalSettings` | All Pages |
| **`Footer`** | **Extend + Refactor** | `settings: GlobalSettingsData` | `GlobalSettings` | All Pages |
| **`Hero`** | **Refactor** | `sectionKey="hero"`, `fallbackContent` | `getHomepageSection("hero")` | Home |
| **`FinalCTA`** | **Extend** | `title`, `subtitle`, `primaryCta`, `secondaryCta`, `analyticsEvent`, `theme` | Props / `GlobalSettings` | Home, Story, How It Works, Impact, Corporate |
| **`FAQAccordion`** | **Create** | `items: FaqItem[]`, `enableSchemaJsonLd?: boolean` | `getFaqs()` | Home, FAQ, Sponsor, Contact |
| **`TrustBadgeStrip`** | **Extend** | `variant?: "all" | "minimal" | "badges"` | Props / Static | Home, Sponsor, Checkout, Impact |
| **`DonationOptionCard`** | **Create** | `option: { type, title, price, description, buttonText }` | Props | Sponsor, Checkout |
| **`TestimonialCard`** | **Create** | `quote`, `author`, `role`, `image` | Props / `ImpactStory` | Home, Impact, Story |
| **`ImpactReport`** | **Reuse** | `data` | Preserved DB query | Impact, Home |
| **`ProgramImpactGallery`** | **Reuse** | `programs` | Preserved DB query | Impact, Home |
| **`TransparencyAlert`** | **Reuse** | `message` | Props | Transparency, Home |
| **`DonationProgressCard`** | **Reuse** | `donation` | Preserved DB query | Checkout, Sponsor |
