'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ComponentPreview } from './component-preview';

// Stagger effect via delays instead of variants
const itemDelay = [0, 0.08, 0.16, 0.24];

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 sm:pt-24 sm:pb-32 overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-3xl sm:max-w-5xl h-[320px] sm:h-[520px] bg-brand/20 blur-[100px] sm:blur-[140px] rounded-full opacity-20" />
                <div className="absolute bottom-0 right-0 w-[280px] h-[280px] sm:w-[460px] sm:h-[460px] bg-brand-2/10 blur-[80px] sm:blur-[120px] rounded-full opacity-25" />
            </div>

            <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-14 items-center">
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: itemDelay[0] }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-medium text-muted-foreground mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-50" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                        </span>
                        v1.0 is now available
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: itemDelay[1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-6 leading-[1.05]"
                    >
                        Build interfaces <br />
                        that feel <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-2">inevitable</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: itemDelay[2] }}
                        className="text-base sm:text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed"
                    >
                        A production-grade UI library for Next.js. Dark-only, motion-first, and designed to feel inevitable.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: itemDelay[3] }}
                        className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4"
                    >
                        <Link
                            href="#get-started"
                            className="group inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-medium text-background bg-brand rounded-lg hover:bg-brand-2 transition-colors"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#components"
                            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-medium text-muted-foreground bg-secondary/30 border border-border rounded-lg hover:bg-secondary/50 hover:text-foreground transition-colors"
                        >
                            View Components
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, type: 'tween', delay: 0.12 }}
                    className="relative lg:h-[600px] flex items-center justify-center w-full"
                >
                    <ComponentPreview autoCycle />

                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute -top-12 -right-4 w-24 h-24 bg-gradient-to-br from-brand to-transparent opacity-20 blur-xl rounded-full pointer-events-none"
                    />
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                        className="absolute -bottom-12 -left-4 w-32 h-32 bg-gradient-to-tr from-brand-2 to-transparent opacity-20 blur-xl rounded-full pointer-events-none"
                    />
                </motion.div>
            </div>
        </section>
    );
}
