'use client';

import { ArrowRight, Copy, Check, Terminal } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function GetStarted() {
    const [copied, setCopied] = useState(false);
    const command = "npm install aura-ui framer-motion";
    const usage = "import { Button } from 'aura-ui'\n\n<Button>Deploy</Button>";

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="get-started" className="py-16 sm:py-32 relative overflow-hidden">
            <div id="docs" className="absolute -top-24" />
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand/10 blur-[80px] sm:blur-[120px] rounded-full -z-10" />

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-6">Ready to build?</h2>
                <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-12">
                    Install once. Compose forever.
                </p>

                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 text-left">
                    <div className="relative rounded-2xl border border-border bg-card/60 p-4 sm:p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.8)]">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            <Terminal className="w-4 h-4" />
                            Install
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border border-border bg-background/60 p-3 sm:p-4 gap-3 sm:gap-0">
                            <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm text-foreground overflow-x-auto w-full sm:w-auto">
                                <span className="whitespace-nowrap">{command}</span>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
                            >
                                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="relative rounded-2xl border border-border bg-card/60 p-4 sm:p-6">
                        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Usage</div>
                        <pre className="mt-4 rounded-lg border border-border bg-background/60 p-3 sm:p-4 text-xs sm:text-sm text-foreground overflow-x-auto">
                            <code>{usage}</code>
                        </pre>
                    </div>
                </div>

                <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 md:grid-cols-2">
                    <Link
                        href="#docs"
                        className="group rounded-2xl border border-border bg-secondary/30 px-4 sm:px-6 py-4 sm:py-5 text-left transition-all hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_0_36px_-16px_rgba(107,104,255,0.6)]"
                    >
                        <div className="text-sm font-medium text-foreground flex items-center gap-2">
                            Documentation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                            API details and installation guides.
                        </p>
                    </Link>

                    <Link
                        href="#components"
                        className="group rounded-2xl border border-border bg-secondary/30 px-4 sm:px-6 py-4 sm:py-5 text-left transition-all hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_0_36px_-16px_rgba(107,104,255,0.6)]"
                    >
                        <div className="text-sm font-medium text-foreground flex items-center gap-2">
                            Component Library
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                            Browse primitives and states.
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}
