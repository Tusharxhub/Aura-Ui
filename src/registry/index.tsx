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

export interface RegistryItem {
    name: string;
    type: "components:ui" | "components:block";
    files: string[];
    component: React.LazyExoticComponent<React.ComponentType<any>>;
    category: string;
    slug: string;
}

export const registry: Record<string, RegistryItem> = {
    "primary-button": {
        name: "Primary Button",
        type: "components:ui",
        files: ["src/registry/buttons/primary-button.tsx"],
        component: PrimaryButton,
        category: "buttons",
        slug: "primary-button",
    },
    "secondary-button": {
        name: "Secondary Button",
        type: "components:ui",
        files: ["src/registry/buttons/secondary-button.tsx"],
        component: SecondaryButton,
        category: "buttons",
        slug: "secondary-button",
    },
    "outline-button": {
        name: "Outline Button",
        type: "components:ui",
        files: ["src/registry/buttons/outline-button.tsx"],
        component: OutlineButton,
        category: "buttons",
        slug: "outline-button",
    },
    "ghost-button": {
        name: "Ghost Button",
        type: "components:ui",
        files: ["src/registry/buttons/ghost-button.tsx"],
        component: GhostButton,
        category: "buttons",
        slug: "ghost-button",
    },
    "text-input": {
        name: "Text Input",
        type: "components:ui",
        files: ["src/registry/inputs/text-input.tsx"],
        component: TextInput,
        category: "inputs",
        slug: "text-input",
    },
    "feature-card": {
        name: "Feature Card",
        type: "components:ui",
        files: ["src/registry/cards/feature-card.tsx"],
        component: FeatureCard,
        category: "cards",
        slug: "feature-card",
    },
};
