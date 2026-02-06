'use client';

import { CommandPalette } from "@/components/command-palette";
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

    // Only pages - no components
    const pages = [
        { name: 'Home', slug: '', category: 'Navigation', type: 'page' as const },
        { name: 'Components', slug: 'components', category: 'Navigation', type: 'page' as const },
        { name: 'Docs', slug: 'docs', category: 'Navigation', type: 'page' as const },
    ];

    return <CommandPalette ref={commandPaletteRef} items={pages} />;
}
