# How to Add a New Component to Aura-Ui

This guide outlines the steps to create and register a new component in the Aura-Ui project.

## Overview

The project is structured into:
1.  **Core Components** (`src/components/ui`): The actual reusable component code.
2.  **Registry** (`src/registry`): A manifest and collection of examples/wrappers that showcase the components.
3.  **Documentation** (`src/registry/**/*.mdx`): Documentation files for the components.

## Step-by-Step Guide

### 1. Create the Core Component
If you are adding a completely new UI element (e.g., an Accordion), first create its implementation in `src/components/ui`.

**File:** `src/components/ui/your-component.tsx`

```tsx
import * as React from "react"
import { cn } from "@/lib/utils" // detailed path may vary based on your utils location

const YourComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("your-base-styles", className)}
      {...props}
    />
  )
)
YourComponent.displayName = "YourComponent"

export { YourComponent }
```

### 2. Create a Registry Entry (Example/Wrapper)
Create a file in `src/registry` that authenticates how this component is used. This is what the registry points to.

**File:** `src/registry/your-category/your-component-example.tsx`
(e.g., `src/registry/cards/feature-card.tsx`)

```tsx
import { YourComponent } from "@/components/ui/your-component"

export default function YourComponentExample() {
  return <YourComponent>Content</YourComponent>
}
```

### 3. Add Documentation (MDX)
Create an MDX file to document the component.

**File:** `src/registry/your-category/your-component.mdx`

```mdx
# Your Component Name

Description of what your component does.

## Usage

\`\`\`tsx
import { YourComponent } from "@/components/ui/your-component"

export default function Example() {
  return <YourComponent>Hello</YourComponent>
}
\`\`\`
```

### 4. Register the Component
Finally, add the component to the main registry file so it can be recognized by the system.

**File:** `src/registry/index.tsx`

1.  **Import the component (Lazy Load):**

```tsx
// Your Category
const YourComponentExample = React.lazy(() => import("@/registry/your-category/your-component-example"));
```

2.  **Add to `registry` object:**

```tsx
export const registry: Record<string, RegistryItem> = {
  // ... existing items
  "your-component-slug": {
      name: "Your Component Name",
      type: "components:ui",
      files: ["src/registry/your-category/your-component-example.tsx"],
      component: YourComponentExample,
      category: "your-category",
      slug: "your-component-slug",
      tags: ["Tag1", "Tag2"],
      dependencies: ["clsx", "tailwind-merge"], // Add dependencies if any
      usage: `import { YourComponent } from "@/components/ui/your-component"

export default function Example() {
  return <YourComponent>Content</YourComponent>
}`,
      props: [
          {
              name: "className",
              type: "string",
              default: "-",
              description: "Additional CSS classes."
          }
      ]
  },
};
```

## Checklist
- [ ] Core component created in `src/components/ui`
- [ ] Registry example created in `src/registry/<category>`
- [ ] MDX documentation created
- [ ] Entry added to `src/registry/index.tsx`
