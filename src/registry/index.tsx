import * as React from "react";

// Buttons
const PrimaryButton = React.lazy(() => import("@/registry/buttons/primary-button"));
const SecondaryButton = React.lazy(() => import("@/registry/buttons/secondary-button"));
const OutlineButton = React.lazy(() => import("@/registry/buttons/outline-button"));
const GhostButton = React.lazy(() => import("@/registry/buttons/ghost-button"));

// Inputs
const TextInput = React.lazy(() => import("@/registry/inputs/text-input"));

// Cards
const FeatureCard = React.lazy(() => import("@/registry/cards/feature-card"));

export interface PropDef {
    name: string;
    type: string;
    default?: string;
    description: string;
}

export interface RegistryItem {
    name: string;
    type: "components:ui" | "components:block";
    files: string[];
    component: React.LazyExoticComponent<React.ComponentType<any>>;
    category: string;
    slug: string;
    dependencies?: string[];
    tags?: string[];
    props?: PropDef[];
    usage?: string;
}

export const registry: Record<string, RegistryItem> = {
    "primary-button": {
        name: "Primary Button",
        type: "components:ui",
        files: ["src/registry/buttons/primary-button.tsx"],
        component: PrimaryButton,
        category: "buttons",
        slug: "primary-button",
        tags: ["Button", "Primary", "Tailwind"],
        dependencies: ["clsx", "tailwind-merge"],
        usage: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button>Click me</Button>
}`,
        props: [
            {
                name: "className",
                type: "string",
                default: "-",
                description: "The class name to apply to the component."
            },
            {
                name: "variant",
                type: "\"primary\" | \"secondary\" | \"outline\" | \"ghost\"",
                default: "\"primary\"",
                description: "The logic/style variant of the button."
            },
            {
                name: "size",
                type: "\"default\" | \"sm\" | \"lg\" | \"icon\"",
                default: "\"default\"",
                description: "The size of the button."
            },
            {
                name: "asChild",
                type: "boolean",
                default: "false",
                description: "Whether to render as a child component (Slot)."
            },
            {
                name: "children",
                type: "node",
                default: "-",
                description: "The content to display within the button."
            }
        ]
    },
    "secondary-button": {
        name: "Secondary Button",
        type: "components:ui",
        files: ["src/registry/buttons/secondary-button.tsx"],
        component: SecondaryButton,
        category: "buttons",
        slug: "secondary-button",
        tags: ["Button", "Secondary", "Tailwind"],
        dependencies: ["clsx", "tailwind-merge"],
        usage: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button variant="secondary">Secondary</Button>
}`,
        props: [
            {
                name: "variant",
                type: "\"secondary\"",
                default: "\"secondary\"",
                description: "The logic/style variant of the button."
            },
            {
                name: "size",
                type: "\"default\" | \"sm\" | \"lg\" | \"icon\"",
                default: "\"default\"",
                description: "The size of the button."
            },
            {
                name: "onClick",
                type: "function",
                default: "-",
                description: "Function called when the button is clicked."
            },
            {
                name: "children",
                type: "node",
                default: "-",
                description: "The content to display within the button."
            }
        ]
    },
    "outline-button": {
        name: "Outline Button",
        type: "components:ui",
        files: ["src/registry/buttons/outline-button.tsx"],
        component: OutlineButton,
        category: "buttons",
        slug: "outline-button",
        tags: ["Button", "Outline", "Tailwind"],
        dependencies: ["clsx", "tailwind-merge"],
        usage: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button variant="outline">Outline</Button>
}`,
        props: [
            {
                name: "variant",
                type: "\"outline\"",
                default: "\"outline\"",
                description: "The logic/style variant of the button."
            },
            {
                name: "size",
                type: "\"default\" | \"sm\" | \"lg\" | \"icon\"",
                default: "\"default\"",
                description: "The size of the button."
            },
            {
                name: "children",
                type: "node",
                default: "-",
                description: "The content to display within the button."
            }
        ]
    },
    "ghost-button": {
        name: "Ghost Button",
        type: "components:ui",
        files: ["src/registry/buttons/ghost-button.tsx"],
        component: GhostButton,
        category: "buttons",
        slug: "ghost-button",
        tags: ["Button", "Ghost", "Tailwind"],
        dependencies: ["clsx", "tailwind-merge"],
        usage: `import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button variant="ghost">Ghost</Button>
}`,
        props: [
            {
                name: "variant",
                type: "\"ghost\"",
                default: "\"ghost\"",
                description: "The logic/style variant of the button."
            },
            {
                name: "size",
                type: "\"default\" | \"sm\" | \"lg\" | \"icon\"",
                default: "\"default\"",
                description: "The size of the button."
            },
            {
                name: "children",
                type: "node",
                default: "-",
                description: "The content to display within the button."
            }
        ]
    },
    "text-input": {
        name: "Text Input",
        type: "components:ui",
        files: ["src/registry/inputs/text-input.tsx"],
        component: TextInput,
        category: "inputs",
        slug: "text-input",
        tags: ["Input", "Form", "Tailwind"],
        dependencies: ["clsx", "tailwind-merge"],
        usage: `import { Input } from "@/components/ui/input"

export default function Example() {
  return <Input placeholder="Email" type="email" />
}`,
        props: [
            {
                name: "type",
                type: "string",
                default: "\"text\"",
                description: "The HTML input type."
            },
            {
                name: "placeholder",
                type: "string",
                default: "-",
                description: "Placeholder text for the input."
            },
            {
                name: "value",
                type: "string | number",
                default: "-",
                description: "Value of the input."
            },
            {
                name: "onChange",
                type: "function",
                default: "-",
                description: "Callback when the value changes."
            },
            {
                name: "className",
                type: "string",
                default: "-",
                description: "Additional CSS classes."
            }
        ]
    },
    "feature-card": {
        name: "Feature Card",
        type: "components:ui",
        files: ["src/registry/cards/feature-card.tsx"],
        component: FeatureCard,
        category: "cards",
        slug: "feature-card",
        tags: ["Card", "Display", "Tailwind"],
        usage: `import { Card, CardTitle, CardContent } from "@/components/ui/card"

export default function Example() {
  return (
    <Card>
      <CardTitle>Feature</CardTitle>
      <CardContent>Description</CardContent>
    </Card>
  )
}`,
        props: [
            {
                name: "className",
                type: "string",
                default: "-",
                description: "Additional CSS classes."
            },
            {
                name: "children",
                type: "node",
                default: "-",
                description: "Content to render inside the card."
            }
        ]
    },
};
