"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> { }

export const mdxComponents = {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1
            className={cn(
                "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            className={cn(
                "mt-10 scroll-m-20 border-b border-border/50 pb-1 text-2xl font-semibold tracking-tight first:mt-0",
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            className={cn(
                "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                className
            )}
            {...props}
        />
    ),
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="my-6 w-full overflow-y-auto rounded-lg border border-border bg-card">
            <table className={cn("w-full text-sm", className)} {...props} />
        </div>
    ),
    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr
            className={cn("m-0 border-t border-border/50 p-0 even:bg-secondary/10", className)}
            {...props}
        />
    ),
    th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className={cn(
                "border border-border/50 px-4 py-2 text-left font-bold bg-secondary/20 [&[align=center]]:text-center [&[align=right]]:text-right",
                className
            )}
            {...props}
        />
    ),
    td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className={cn(
                "border border-border/50 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                className
            )}
            {...props}
        />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className={cn(
                "relative rounded bg-secondary px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
                className
            )}
            {...props}
        />
    ),
    pre: ({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
        // Trying to extract text content for copy button
        // This is a simplification; robust extraction might need more logic if children are complex objects
        const textRef = React.useRef<HTMLPreElement>(null);

        return (
            <div className="relative my-6 rounded-xl border border-border bg-[#0d0e11]">
                <div className="absolute top-3 right-3 z-20">
                    {/* We can't easily get the raw text here in RSC/Client split without passing it explicitly. 
                 For now, let's just assume the user will copy manually or we rely on the `Code Block` usage in MDX.
                 Actually, standard MDX `pre` usually wraps a `code` element. 
             */}
                    {/* Placeholder for Copy Button if we want it here, but MDX parsing is tricky. */}
                </div>
                <pre
                    className={cn(
                        "mb-4 mt-2 overflow-x-auto rounded-xl p-4 text-sm font-mono leading-relaxed",
                        className
                    )}
                    {...props}
                >
                    {children}
                </pre>
            </div>
        )
    },
};
