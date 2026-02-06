'use client';

import { CommandPalette } from "@/components/command-palette";
import { registry } from "@/registry/index";
import { useEffect, useRef } from "react";

export function GlobalCommandPalette() {
    const commandPaletteRef = useRef<{ open: () => void }>(null);

    useEffect(() => {
        // Listen for custom event to open search
        const handleOpenSearch = () => {
            commandPaletteRef.current?.open();
        };

        window.addEventListener('openSearchPalette', handleOpenSearch);
        return () => window.removeEventListener('openSearchPalette', handleOpenSearch);
    }, []);

    const pages = [
        { name: 'Home', slug: '', category: 'Navigation', type: 'page' as const },
        { name: 'Components', slug: 'components', category: 'Navigation', type: 'page' as const },
    ];

    const components = Object.values(registry).map(item => ({
        name: item.name,
        slug: item.slug,
        category: item.category,
        type: 'component' as const,
    }));

    const items = [...pages, ...components];

    return <CommandPalette ref={commandPaletteRef} items={items} />;
}
