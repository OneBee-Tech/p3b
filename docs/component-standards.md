# Component Documentation & Standards Guide

This guide establishes the mandatory architecture, interface conventions, and accessibility (WCAG 2.2 AA) standards for all components in the **One Dollar. One Child. One Future.** platform.

---

## 1. Component Refactoring & Hierarchy Strategy
Before introducing any new UI component, follow this priority sequence:
1. **Reuse Existing Component**: Use existing primitives from `src/components/ui/` or `src/components/landing/`.
2. **Extend Existing Component**: Add optional props or sub-variants without breaking contract.
3. **Refactor Existing Component**: Extract shared logic into utility or compound component patterns.
4. **Create New Component**: Only create new files when no existing pattern satisfies the requirement.

---

## 2. Mandatory Component Structure

Every shared UI component must adhere to the following structure:

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Component Documentation
 * 
 * @responsibility Brief statement describing what this component renders and handles.
 * @accessibility Note keyboard navigation, ARIA roles, focus rings, or contrast requirements.
 */
export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Variant style option */
  variant?: "default" | "outline" | "ghost";
  /** Optional loading state fallback indicator */
  isLoading?: boolean;
  /** Optional empty state condition message */
  isEmpty?: boolean;
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = "default", isLoading, isEmpty, children, ...props }, ref) => {
    if (isLoading) {
      return <div className="animate-pulse bg-muted h-12 w-full rounded-md" aria-busy="true" />;
    }

    if (isEmpty) {
      return <div className="text-muted-foreground p-4 text-center">No data available.</div>;
    }

    return (
      <div
        ref={ref}
        className={cn("base-styles-here", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MyComponent.displayName = "MyComponent";
```

---

## 3. Mandatory State Handling (Loading, Empty, Error, Fallback)

Every dynamic component connected to database/CMS models MUST handle:
- **Loading State**: Accessible skeleton loaders with `aria-busy="true"`.
- **Empty State**: User-friendly text guidance instead of blank white cards.
- **Error State**: Graceful fallback UI with retry capability if data fetching fails.
- **Missing Asset Fallback**: Default high-quality placeholder image if dynamic `photoUrl` or `imageUrl` is null/empty.

---

## 4. Accessibility Expectations (WCAG 2.2 AA)

- **Semantic HTML**: Always use `<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`, `<button>`, `<a>`.
- **Focus Rings**: All interactive elements must show visible focus rings (`focus-visible:ring-2 focus-visible:ring-ring`).
- **Contrast**: Minimum 4.5:1 text contrast for standard text, 3:1 for large text.
- **ARIA Labels**: Any icon-only button must have `aria-label`.
- **Reduced Motion**: Any Framer Motion or CSS animation must respect `motion-reduce:transition-none` or `prefers-reduced-motion`.
