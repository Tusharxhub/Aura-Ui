'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchItem {
    name: string;
    slug: string;
    category: string;
    type: 'component' | 'page';
}

interface CommandPaletteProps {
    items: SearchItem[];
}

export function CommandPalette({ items }: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Handle keyboard shortcut (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                setSearch('');
            }
            // Also listen for custom trigger event
            if ((e.metaKey || e.ctrlKey) && e.code === 'KeyK') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                setSearch('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const filteredItems = React.useMemo(() => {
        if (!search) return items.slice(0, 8);
        return items.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 12);
    }, [search, items]);

    const handleSelect = (item: SearchItem) => {
        if (item.type === 'component') {
            window.location.href = `/components/${item.category}/${item.slug}`;
        } else {
            window.location.href = `/${item.slug}`;
        }
        setIsOpen(false);
        setSearch('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
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

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    return (
        <>
            {/* Command Palette Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] pointer-events-auto"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Backdrop with blur */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                        {/* Dialog */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full mx-4 max-w-md bg-card border border-border rounded-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
                                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search components..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                                />
                                {search && (
                                    <button
                                        onClick={() => setSearch('')}
                                        className="p-1 hover:bg-secondary rounded transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Results */}
                            {filteredItems.length > 0 ? (
                                <div className="max-h-[300px] overflow-y-auto custom-scrollbar divide-y divide-border/50">
                                    {filteredItems.map((item, idx) => (
                                        <motion.button
                                            key={`${item.category}-${item.slug}`}
                                            onClick={() => handleSelect(item)}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                            className={cn(
                                                "w-full text-left px-4 py-3 transition-colors flex items-start justify-between",
                                                selectedIndex === idx
                                                    ? "bg-brand text-background"
                                                    : "hover:bg-secondary/50 text-foreground"
                                            )}
                                        >
                                            <div className="flex-1">
                                                <div className="text-sm font-medium">{item.name}</div>
                                                <div className={cn(
                                                    "text-xs mt-1",
                                                    selectedIndex === idx ? "text-background/70" : "text-muted-foreground"
                                                )}>
                                                    {item.category}
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                                    No components found
                                </div>
                            )}

                            {/* Footer */}
                            <div className="border-t border-border/50 bg-secondary/30 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex gap-3">
                                    <span>↑↓ to navigate</span>
                                    <span>↵ to select</span>
                                </div>
                                <span>ESC to close</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
