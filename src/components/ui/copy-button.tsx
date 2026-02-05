"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string;
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    }, [hasCopied]);

    return (
        <button
            className={cn(
                "relative z-10 p-2 hover:bg-secondary/50 rounded-md transition-colors text-muted-foreground hover:text-foreground",
                className
            )}
            onClick={() => {
                navigator.clipboard.writeText(text);
                setHasCopied(true);
            }}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
    );
}
