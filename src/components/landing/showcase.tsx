'use client';

export function Showcase() {
    return (
        <section id="components" className="py-28 bg-background border-t border-border/60">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Component showcase</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-7 rounded-xl bg-secondary/10 border border-border flex flex-col items-center justify-center gap-4 min-h-[220px] hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center justify-between w-full text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            <span>Button</span>
                            <span className="text-brand">Hover</span>
                        </div>
                        <button className="px-5 py-2.5 bg-foreground text-background font-medium rounded-lg shadow-[0_0_18px_-8px_rgba(107,104,255,0.6)]">Primary</button>
                    </div>

                    <div className="p-7 rounded-xl bg-secondary/10 border border-border flex flex-col items-center justify-center gap-4 min-h-[220px] hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center justify-between w-full text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            <span>Input</span>
                            <span className="text-brand">Focus</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Email address"
                            className="w-full max-w-[220px] px-3 py-2.5 bg-secondary/40 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                        />
                    </div>

                    <div className="p-7 rounded-xl bg-secondary/10 border border-border flex flex-col items-center justify-center gap-4 min-h-[220px] hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center justify-between w-full text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            <span>Card</span>
                            <span className="text-brand">Elevated</span>
                        </div>
                        <div className="w-full max-w-[240px] bg-card border border-border rounded-lg p-4 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.8)]">
                            <div className="h-2 w-16 rounded-full bg-muted mb-4" />
                            <div className="h-2 w-24 rounded-full bg-muted" />
                        </div>
                    </div>

                    <div className="p-7 rounded-xl bg-secondary/10 border border-border flex flex-col items-center justify-center gap-4 min-h-[220px] hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center justify-between w-full text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            <span>Tooltip</span>
                            <span className="text-brand">Reveal</span>
                        </div>
                        <div className="relative">
                            <button className="px-4 py-2 border border-border rounded-md text-sm">Hover</button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background text-xs rounded-md whitespace-nowrap">
                                Clarifies intent
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
                            </div>
                        </div>
                    </div>

                    <div className="p-7 rounded-xl bg-secondary/10 border border-border flex flex-col items-center justify-center gap-4 min-h-[220px] hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center justify-between w-full text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            <span>Dropdown</span>
                            <span className="text-brand">Open</span>
                        </div>
                        <div className="w-full max-w-[220px] bg-card border border-border rounded-md shadow-xl overflow-hidden">
                            <div className="px-3 py-2 text-sm text-foreground bg-secondary/40">Account</div>
                            <div className="px-3 py-2 text-sm text-muted-foreground">Notifications</div>
                            <div className="px-3 py-2 text-sm text-muted-foreground">Team</div>
                        </div>
                    </div>

                    <div className="p-7 rounded-xl bg-secondary/10 border border-border flex flex-col items-center justify-center gap-4 min-h-[220px] hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center justify-between w-full text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            <span>Modal</span>
                            <span className="text-brand">Active</span>
                        </div>
                        <div className="w-full max-w-[240px] bg-card border border-border rounded-lg p-4">
                            <div className="h-2 w-20 rounded-full bg-muted mb-4" />
                            <div className="h-2 w-24 rounded-full bg-muted mb-6" />
                            <button className="px-3 py-2 text-sm bg-brand text-background rounded-md">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
