'use client';

import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ComponentItem {
    name: string;
    slug: string;
    category: string;
    description?: string;
}

interface ComponentSearchProps {
    items: ComponentItem[];
    onSelect?: (item: ComponentItem) => void;
}

export function ComponentSearch({ items, onSelect }: ComponentSearchProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredItems = useMemo(() => {
        if (!search) return items.slice(0, 10);
        return items.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase()) ||
            item.slug.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 15);
    }, [search, items]);

    const handleSelect = (item: ComponentItem) => {
        onSelect?.(item);
        setIsOpen(false);
        setSearch('');
        window.location.href = `/components/${item.category}/${item.slug}`;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === '/') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    handleSelect(filteredItems[selectedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                break;
        }
    };

    React.useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    return (
        <div className="w-full" onKeyDown={handleKeyDown}>
            {/* Search Input */}
            <div className="relative">
                <div className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-lg border transition-all cursor-text",
                    isOpen
                        ? "border-brand bg-card shadow-[0_0_20px_-8px_rgba(107,104,255,0.6)]"
                        : "border-border bg-background hover:border-brand/50"
                )}>
                    <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Search UI..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsOpen(true)}
                        onClick={() => setIsOpen(true)}
                        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    {!search && !isOpen && (
                        <span className="text-xs text-muted-foreground ml-auto">/</span>
                    )}
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] overflow-hidden z-50 max-h-[400px] overflow-y-auto custom-scrollbar"
                        >
                            {filteredItems.length > 0 ? (
                                <div className="divide-y divide-border/50">
                                    {filteredItems.map((item, idx) => (
                                        <motion.button
                                            key={`${item.category}-${item.slug}`}
                                            onClick={() => handleSelect(item)}
                                            className={cn(
                                                "w-full text-left px-4 py-3.5 transition-colors flex items-center justify-between group",
                                                selectedIndex === idx
                                                    ? "bg-brand text-background"
                                                    : "hover:bg-secondary/50 text-foreground"
                                            )}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="flex-1">
                                                    <div className={cn(
                                                        "text-sm font-medium truncate",
                                                        selectedIndex === idx ? "text-background" : "text-foreground"
                                                    )}>
                                                        {item.name}
                                                    </div>
                                                    <div className={cn(
                                                        "text-xs truncate",
                                                        selectedIndex === idx ? "text-background/70" : "text-muted-foreground"
                                                    )}>
                                                        {item.category}
                                                    </div>
                                                </div>
                                            </div>
                                            {selectedIndex === idx && (
                                                <motion.div
                                                    layoutId="selectedIndicator"
                                                    className="w-2 h-2 rounded-full bg-background/50 flex-shrink-0 ml-2"
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                                    No components found
                                </div>
                            )}

                            {/* Footer hint */}
                            {filteredItems.length > 0 && (
                                <div className="sticky bottom-0 bg-secondary/30 border-t border-border/50 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                                    <div className="flex gap-4">
                                        <span>↑↓ Navigate</span>
                                        <span>↵ Select</span>
                                        <span>Esc Close</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Close on outside click */}
                {isOpen && (
                    <div
                        className="fixed inset-0 -z-10"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
