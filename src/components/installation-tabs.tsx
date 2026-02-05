"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

interface InstallationTabsProps {
    slug: string;
    code?: string;
}

export function InstallationTabs({ slug, code }: InstallationTabsProps) {
    const [packageManager, setPackageManager] = React.useState("npm");

    const commands: Record<string, string> = {
        npm: `npx aura-ui@latest add ${slug}`,
        pnpm: `pnpm dlx aura-ui@latest add ${slug}`,
        yarn: `npx aura-ui@latest add ${slug}`,
        bun: `bun x aura-ui@latest add ${slug}`,
    };

    return (
        <div className="w-full">
            <Tabs defaultValue="cli" className="w-full">
                <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                    <h2 className="text-xl font-semibold">Installation</h2>
                    <TabsList className="bg-transparent p-0 gap-4">
                        <TabsTrigger value="cli" className="bg-transparent shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2">CLI</TabsTrigger>
                        <TabsTrigger value="manual" className="bg-transparent shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-2">Manual</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="cli" className="space-y-4">
                    <div className="flex gap-2 mb-4">
                        {["npm", "pnpm", "yarn", "bun"].map((pm) => (
                            <button
                                key={pm}
                                onClick={() => setPackageManager(pm)}
                                className={cn(
                                    "px-3 py-1 rounded-md text-sm font-medium transition-colors border",
                                    packageManager === pm
                                        ? "bg-secondary text-foreground border-border"
                                        : "text-muted-foreground hover:bg-secondary/50 border-transparent"
                                )}
                            >
                                {pm}
                            </button>
                        ))}
                    </div>
                    <div className="relative rounded-xl border border-border bg-[#0d0e11] p-4 flex items-center justify-between group">
                        <code className="text-sm font-mono text-foreground">{commands[packageManager]}</code>
                        <CopyButton text={commands[packageManager]} />
                    </div>
                </TabsContent>

                <TabsContent value="manual">
                    {code ? (
                        <div className="rounded-xl border border-border bg-[#0d0e11] overflow-hidden relative shadow-md">
                            <div className="absolute top-4 right-4 z-10">
                                <CopyButton text={code} />
                            </div>
                            <pre className="p-6 overflow-x-auto text-sm font-mono text-muted-foreground leading-relaxed custom-scrollbar max-h-[500px]">
                                <code>{code}</code>
                            </pre>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                            <p>Manual installation instructions to copy the source code directly.</p>
                            <p className="mt-2">Check the <strong>Source</strong> section below and copy the code into your project.</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
