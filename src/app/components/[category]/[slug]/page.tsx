import * as React from "react";
import { notFound } from "next/navigation";
import { registry } from "@/registry/index";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import { CopyButton } from "@/components/ui/copy-button";
import { InstallationTabs } from "@/components/installation-tabs";
import { PropsTable } from "@/components/props-table";

interface PageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export default async function ComponentPage({ params }: PageProps) {
    const { category, slug } = await params;
    const component = registry[slug];

    if (!component || component.category !== category) {
        notFound();
    }

    const Component = component.component;
    const filePath = path.join(process.cwd(), component.files[0]);

    let code = "";

    try {
        code = await fs.readFile(filePath, "utf-8");
    } catch {
        code = "// Error reading file";
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="max-w-[1000px] mx-auto px-6">
                <Link
                    href="/components"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to components
                </Link>

                {/* Header */}
                <div className="space-y-4 mb-8 md:mb-10">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-semibold text-brand tracking-wide uppercase">
                            {component.category}
                        </span>
                        {component.tags?.map(tag => (
                            <span key={tag} className="px-2.5 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">{component.name}</h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        A reusable, accessible, and customizable {component.name.toLowerCase()} component.
                    </p>
                </div>

                <div className="grid gap-12 md:gap-16">

                    {/* Preview (First) */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-border/50 pb-2">
                            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Preview</h2>
                        </div>
                        <div className="rounded-xl border border-border bg-card p-6 md:p-12 flex items-center justify-center min-h-[300px] md:min-h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background relative overflow-hidden shadow-sm">
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                            <React.Suspense fallback={<div className="animate-pulse text-muted-foreground">Loading preview...</div>}>
                                <div className="relative z-10 scale-125">
                                    <Component />
                                </div>
                            </React.Suspense>
                        </div>
                    </div>

                    {/* Installation */}
                    <div className="space-y-6">
                        <InstallationTabs slug={component.slug} code={code} />
                    </div>

                    {/* Usage (Labeled as Source Code) */}
                    {component.usage && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Source Code</h2>
                            </div>
                            <div className="rounded-xl border border-border bg-[#0d0e11] overflow-hidden relative shadow-md">
                                <div className="absolute top-4 right-4 z-10">
                                    <CopyButton text={component.usage} />
                                </div>
                                <pre className="p-6 overflow-x-auto text-sm font-mono text-muted-foreground leading-relaxed custom-scrollbar max-h-[300px]">
                                    <code>{component.usage}</code>
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Props */}
                    {component.props && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-border/50 pb-2">
                                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Props</h2>
                            </div>
                            <PropsTable data={component.props} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
