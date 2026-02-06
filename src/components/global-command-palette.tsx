'use client';

import { CommandPalette } from "@/components/command-palette";
import { registry } from "@/registry/index";

export function GlobalCommandPalette() {
    const items = Object.values(registry).map(item => ({
        name: item.name,
        slug: item.slug,
        category: item.category,
        type: 'component' as const,
    }));

    return <CommandPalette items={items} />;
}
