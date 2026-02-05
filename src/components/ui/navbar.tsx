'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';

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
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 border-b border-transparent"
        >
            <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group z-50" onClick={() => setIsOpen(false)}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand to-brand-2 group-hover:opacity-90 transition-opacity" />
                    <span className="text-lg font-semibold tracking-tight text-foreground">Aura UI</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="#docs" className="hover:text-foreground transition-colors">Docs</Link>
                    <Link href="/components" className="hover:text-foreground transition-colors">Components</Link>
                    <Link href="https://github.com" className="hover:text-foreground transition-colors">GitHub</Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="https://github.com"
                        className="hidden sm:block p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link
                        href="#get-started"
                        className="px-4 py-2 text-sm font-medium text-background bg-brand rounded-lg hover:bg-brand-2 transition-colors shadow-[0_0_18px_-6px_rgba(107,104,255,0.65)]"
                    >
                        Get Started
                    </Link>
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 top-0 h-screen w-full bg-background border-b border-border/50 flex flex-col pt-24 px-6 md:hidden overflow-y-auto"
                        style={{ backgroundColor: 'rgba(11, 11, 15, 0.98)', backdropFilter: 'blur(20px)' }}
                    >
                        <nav className="flex flex-col gap-6 text-lg font-medium text-foreground">
                            <Link href="#docs" className="py-2 border-b border-border/10" onClick={() => setIsOpen(false)}>Docs</Link>
                            <Link href="/components" className="py-2 border-b border-border/10" onClick={() => setIsOpen(false)}>Components</Link>
                            <Link href="https://github.com" className="py-2 border-b border-border/10" onClick={() => setIsOpen(false)}>GitHub</Link>
                        </nav>

                        <div className="mt-8 flex flex-col gap-4">
                            <Link
                                href="#get-started"
                                className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-background bg-brand rounded-lg hover:bg-brand-2 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                Get Started
                            </Link>
                            <Link
                                href="https://github.com"
                                className="w-full flex items-center justify-center gap-2 p-3 text-muted-foreground border border-border rounded-lg hover:text-foreground transition-colors"
                            >
                                <Github className="w-5 h-5" />
                                Star on GitHub
                            </Link>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
