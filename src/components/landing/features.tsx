'use client';

import { motion } from 'framer-motion';
import { Layers, Zap, Command } from 'lucide-react';

const features = [
    {
        icon: Command,
        title: 'Accessible by default',
        description: 'Keyboard navigation, focus management, and ARIA baked in. Nothing to retrofit later.',
    },
    {
        icon: Zap,
        title: 'Motion with intention',
        description: 'Macro transitions that clarify state. Subtle, consistent, and production-ready.',
    },
    {
        icon: Layers,
        title: 'Composable and flexible',
        description: 'Atomic primitives aligned to Tailwind utilities, built to be rearranged without friction.',
    },
];

export function Features() {
    return (
        <section id="why" className="py-16 sm:py-24 relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <div className="mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">Why Aura UI</h2>
                    <p className="text-muted-foreground mt-3 max-w-xl">
                        A system that stays out of your way and still raises the bar.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.25, delay: idx * 0.08, type: 'tween' }}
                            className="group p-6 sm:p-8 rounded-2xl bg-secondary/20 border border-border hover:border-brand/40 hover:bg-secondary/30 transition-all hover:shadow-[0_0_32px_-18px_rgba(107,104,255,0.65)]"
                        >
                            <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-6 group-hover:bg-brand/10 transition-colors">
                                <feature.icon className="w-6 h-6 text-muted-foreground group-hover:text-brand transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
