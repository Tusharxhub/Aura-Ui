'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github } from 'lucide-react';

export function Navbar() {
    const { scrollY } = useScroll();

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
                // @ts-ignore
                backdropFilter,
                borderBottomColor,
            }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 border-b border-transparent"
        >
            <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand to-brand-2 group-hover:opacity-90 transition-opacity" />
                    <span className="text-lg font-semibold tracking-tight text-foreground">Aura UI</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="#docs" className="hover:text-foreground transition-colors">Docs</Link>
                    <Link href="/components" className="hover:text-foreground transition-colors">Components</Link>
                    <Link href="https://github.com" className="hover:text-foreground transition-colors">GitHub</Link>
                </nav>

                <div className="flex items-center gap-4">
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
            </div>
        </motion.header>
    );
}
