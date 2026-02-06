'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type PreviewTab = 'button' | 'input' | 'modal';

type ComponentPreviewProps = {
    autoCycle?: boolean;
};

const tabs: PreviewTab[] = ['button', 'input', 'modal'];

export function ComponentPreview({ autoCycle = false }: ComponentPreviewProps) {
    const [activeTab, setActiveTab] = useState<PreviewTab>('button');
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (!autoCycle) return;

        const interval = setInterval(() => {
            setActiveTab((current) => {
                const next = tabs[(tabs.indexOf(current) + 1) % tabs.length];
                return next;
            });
        }, 3600);

        return () => clearInterval(interval);
    }, [autoCycle]);

    useEffect(() => {
        if (!autoCycle || activeTab !== 'modal') return;

        const openTimer = setTimeout(() => setModalOpen(true), 400);
        const closeTimer = setTimeout(() => setModalOpen(false), 1900);

        return () => {
            clearTimeout(openTimer);
            clearTimeout(closeTimer);
        };
    }, [activeTab, autoCycle]);

    return (
        <div className="w-full max-w-sm md:max-w-md mx-auto bg-card border border-border rounded-xl overflow-hidden shadow-[0_25px_80px_-60px_rgba(107,104,255,0.35)]">
            {/* Tabs */}
            <div className="flex items-center border-b border-border bg-muted/30">
                <button
                    onClick={() => setActiveTab('button')}
                    className={cn(
                        "flex-1 px-4 py-3 text-sm font-medium transition-colors relative hover:text-foreground",
                        activeTab === 'button' ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    Button
                    {activeTab === 'button' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('input')}
                    className={cn(
                        "flex-1 px-4 py-3 text-sm font-medium transition-colors relative hover:text-foreground",
                        activeTab === 'input' ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    Input
                    {activeTab === 'input' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('modal')}
                    className={cn(
                        "flex-1 px-4 py-3 text-sm font-medium transition-colors relative hover:text-foreground",
                        activeTab === 'modal' ? "text-foreground" : "text-muted-foreground"
                    )}
                >
                    Modal
                    {activeTab === 'modal' && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="h-56 sm:h-64 flex items-center justify-center p-6 sm:p-8 bg-background relative overflow-hidden group">

                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f222a_1px,transparent_1px),linear-gradient(to_bottom,#1f222a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

                <AnimatePresence mode="wait">
                    {activeTab === 'button' && (
                        <motion.div
                            key="button"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            <motion.button
                                animate={{
                                    boxShadow: [
                                        '0 0 0 -10px rgba(107, 104, 255, 0.0)',
                                        '0 0 20px -6px rgba(107, 104, 255, 0.5)',
                                        '0 0 0 -10px rgba(107, 104, 255, 0.0)',
                                    ],
                                    y: [0, -2, 0],
                                }}
                                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                                className="px-6 py-2.5 bg-foreground text-background font-medium rounded-lg"
                            >
                                Hover Me
                            </motion.button>
                        </motion.div>
                    )}

                    {activeTab === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, type: 'tween' }}
                            className="w-full max-w-xs px-4 sm:px-0"
                        >
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Focus me..."
                                    className="w-full px-4 py-2.5 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm placeholder:text-muted-foreground"
                                />
                                <motion.div
                                    animate={{ opacity: [0.1, 0.45, 0.1] }}
                                    transition={{ duration: 3, repeat: Infinity, type: 'tween' }}
                                    className="absolute inset-0 rounded-lg bg-brand/10 pointer-events-none blur-lg"
                                />
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'modal' && (
                        <motion.div
                            key="modal"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.25, type: 'tween' }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            <button
                                onClick={() => setModalOpen(true)}
                                className="px-6 py-2.5 border border-border bg-secondary/30 text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-colors"
                            >
                                Open Dialog
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Modal Overlay Demo */}
                <AnimatePresence>
                    {modalOpen && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, type: 'tween' }}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setModalOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                                transition={{ duration: 0.25, type: 'tween' }}
                                className="relative w-full max-w-[280px] bg-card border border-border/50 rounded-xl p-6 shadow-2xl"
                            >
                                <h4 className="text-lg font-medium text-foreground mb-2">Changes Saved</h4>
                                <p className="text-sm text-muted-foreground mb-4">Your changes have been successfully saved to the cloud.</p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="px-4 py-2 text-sm bg-brand text-background rounded-md hover:bg-brand-2 transition-colors"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
