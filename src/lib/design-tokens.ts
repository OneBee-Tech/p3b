/**
 * Standard Design Tokens for One Dollar. One Child. One Future.
 * Centralized design system constants supporting WCAG 2.2 AA accessibility,
 * consistent spacing, motion, typography, and responsive design tokens.
 */

export const colors = {
  // Brand & Trust Colors
  trustBlue: {
    DEFAULT: "#1E3A8A",
    light: "#3B82F6",
    dark: "#1E293B",
    50: "#EFF6FF",
    100: "#DBEAFE",
    500: "#3B82F6",
    800: "#1E40AF",
    900: "#1E3A8A",
  },
  impactGold: {
    DEFAULT: "#FACC15",
    light: "#FEF08A",
    dark: "#CA8A04",
    50: "#FEFCE8",
    100: "#FEF9C3",
    500: "#EAB308",
    600: "#CA8A04",
  },
  emeraldSuccess: {
    DEFAULT: "#10B981",
    light: "#D1FAE5",
    dark: "#065F46",
  },
  // Neutrals & Surface Colors
  surface: {
    warmBg: "#FAF7F2",
    warmIvory: "#FDFBF7",
    cardLight: "#FFFFFF",
    cinematicDark: "#0B0F19",
    cinematicCharcoal: "#1A1D23",
  },
  // Semantic Feedback
  semantic: {
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
    success: "#10B981",
  },
} as const;

export const typography = {
  fontFamilies: {
    heading: "var(--font-jakarta), sans-serif",
    body: "var(--font-inter), sans-serif",
    quote: "var(--font-playfair), serif",
  },
  fontSizes: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1.16" }],
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  section: "5rem",
} as const;

export const radii = {
  none: "0",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
} as const;

export const shadows = {
  subtle: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
  card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
  elevated: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
  glowGold: "0 0 20px rgba(250, 204, 21, 0.25)",
  glowBlue: "0 0 20px rgba(30, 58, 138, 0.25)",
} as const;

export const breakpoints = {
  mobile: "320px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1280px",
  wide: "1536px",
} as const;

export const motionTokens = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  easing: {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  respectsReducedMotion: true,
} as const;
