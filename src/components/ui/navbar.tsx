'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';

const DiscordIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
);

export function Navbar() {
    const { scrollY } = useScroll();
    const [isOpen, setIsOpen] = useState(false);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);


    const height = useTransform(scrollY, [0, 120], [80, 60]);
    const backgroundColor = useTransform(
        scrollY,
        [0, 120],
        ['rgba(11, 11, 15, 0)', 'rgba(11, 11, 15, 0.82)']
    );
    const backdropFilter = useTransform(scrollY, [0, 120], ['blur(0px)', 'blur(14px)']);
    const borderBottomColor = useTransform(
        scrollY,
        [0, 120],
        ['rgba(31, 34, 42, 0)', 'rgba(31, 34, 42, 0.9)']
    );

    return (
        <motion.header
            style={{
                height,
                backgroundColor,
                backdropFilter,
                borderBottomColor,
            }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 border-b border-transparent"
        >
            <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group z-50" onClick={() => setIsOpen(false)}>
                    <motion.div 
                        className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand to-brand-2"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    />
                    <span className="text-lg font-semibold tracking-tight text-foreground">Aura UI</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                        <Link href="#docs" className="hover:text-foreground transition-colors">Docs</Link>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                        <Link href="/components" className="hover:text-foreground transition-colors">Components</Link>
                    </motion.div>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <motion.button
                        onClick={() => {
                            // Dispatch custom event
                            window.dispatchEvent(new Event('openSearchPalette'));
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/50 border border-border/50 text-muted-foreground hover:text-foreground hover:border-brand/50 transition-all cursor-pointer group"
                        title="Press Cmd+K or Ctrl+K to search"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <span className="text-xs font-medium">Search</span>
                        <kbd className="text-xs px-1.5 py-0.5 rounded bg-background/50 border border-border text-muted-foreground group-hover:text-foreground">⌘K</kbd>
                    </motion.button>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <Link
                            href="https://discord.gg/WQGQCctm"
                            className="hidden sm:block p-2 text-muted-foreground hover:text-foreground transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <DiscordIcon />
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <Link
                            href="https://github.com/Tusharxhub/Aura-Ui"
                            className="hidden sm:block p-2 text-muted-foreground hover:text-foreground transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <Link
                            href="#get-started"
                            className="px-4 py-2 text-sm font-medium text-background bg-brand rounded-lg hover:bg-brand-2 transition-colors shadow-[0_0_18px_-6px_rgba(107,104,255,0.65)]"
                        >
                            Get Started
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors z-50"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ 
                            type: 'spring', 
                            stiffness: 300, 
                            damping: 30,
                            mass: 0.8
                        }}
                        className="absolute inset-0 top-0 h-screen w-full bg-background border-b border-border/50 flex flex-col pt-24 px-6 md:hidden overflow-y-auto"
                        style={{ backgroundColor: 'rgba(11, 11, 15, 0.98)', backdropFilter: 'blur(20px)' }}
                    >
                        <nav className="flex flex-col gap-6 text-lg font-medium text-foreground">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 25 }}
                            >
                                <Link href="#docs" className="py-2 border-b border-border/10 block" onClick={() => setIsOpen(false)}>Docs</Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 25 }}
                            >
                                <Link href="/components" className="py-2 border-b border-border/10 block" onClick={() => setIsOpen(false)}>Components</Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
                            >
                                <Link href="https://github.com" className="py-2 border-b border-border/10 block" onClick={() => setIsOpen(false)}>GitHub</Link>
                            </motion.div>
                        </nav>

                        <motion.div 
                            className="mt-8 flex flex-col gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, type: 'spring', stiffness: 300, damping: 25 }}
                        >
                            <Link
                                href="#get-started"
                                className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-background bg-brand rounded-lg hover:bg-brand-2 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Get Started
                            </Link>
                            <Link
                                href="https://discord.gg/your-invite"
                                className="w-full flex items-center justify-center gap-2 p-3 text-muted-foreground border border-border rounded-lg hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <DiscordIcon />
                                Join Discord
                            </Link>
                            <Link
                                href="https://github.com/Tusharxhub/Aura-Ui"
                                className="w-full flex items-center justify-center gap-2 p-3 text-muted-foreground border border-border rounded-lg hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="w-5 h-5" />
                                Star on GitHub
                            </Link>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
