import * as React from "react";
import { cn } from "@/lib/utils";

interface ComponentViewProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    category: string;
}

export function ComponentView({ children, className, name, category, ...props }: ComponentViewProps) {
    return (
        <div
            className={cn(
                "group relative flex flex-col rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md",
                className
            )}
            {...props}
        >
            <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-secondary/20 rounded-t-xl">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground group-hover:bg-brand transition-colors" />
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{category} / {name}</span>
                </div>
            </div>
            <div className="flex min-h-[180px] w-full items-center justify-center p-8 bg-gradient-to-br from-background to-secondary/10 rounded-b-xl">
                {children}
            </div>
        </div>
    );
}
