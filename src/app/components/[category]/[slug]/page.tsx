import * as React from "react";
import { notFound } from "next/navigation";
import { registry } from "@/registry/index";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";

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
    } catch (error) {
        code = "// Error reading file";
        console.error("Error reading component file:", error);
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="max-w-[1000px] mx-auto px-6">
                <Link
                    href="/components"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to components
                </Link>

                <div className="space-y-2 mb-12">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground capitalize">
                            {component.category}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{component.name}</h1>
                    <p className="text-lg text-muted-foreground">
                        A reusable {component.name} component.
                    </p>
                </div>

                <div className="grid gap-10">
                    {/* Preview */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-border/50 pb-2">Preview</h2>
                        <div className="rounded-xl border border-border bg-card p-12 flex items-center justify-center min-h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background">
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Component />
                            </React.Suspense>
                        </div>
                    </section>

                    {/* Code */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold border-b border-border/50 pb-2">Source</h2>
                        <div className="rounded-xl border border-border bg-secondary/10 overflow-hidden relative">
                            <pre className="p-6 overflow-x-auto text-sm font-mono text-muted-foreground">
                                <code>{code}</code>
                            </pre>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
