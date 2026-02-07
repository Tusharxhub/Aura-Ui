'use client';

import { motion } from 'framer-motion';
import { ComponentPreview } from './component-preview';

export function LivePreview() {
    return (
        <section id="preview" className="py-16 sm:py-28 border-t border-border/60">
            <div className="max-w-300 mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 items-center">
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.25, type: 'tween' }}
                        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight"
                    >
                        Live component preview
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.25, type: 'tween', delay: 0.05 }}
                        className="mt-4 text-muted-foreground text-base sm:text-lg max-w-md"
                    >
                        Switch between primitives and feel the motion system behave the same way every time.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.25, type: 'tween', delay: 0.08 }}
                >
                    <ComponentPreview />
                </motion.div>
            </div>
        </section>
    );
}
