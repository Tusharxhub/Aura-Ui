import * as React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    // Base sizes
                    "px-5 py-2.5",
                    // Variants
                    variant === "primary" &&
                    "bg-foreground text-background shadow-[0_0_18px_-8px_rgba(107,104,255,0.6)] hover:bg-foreground/90",
                    variant === "secondary" &&
                    "bg-secondary/40 text-foreground hover:bg-secondary/60",
                    variant === "outline" &&
                    "border border-border bg-transparent hover:bg-secondary/10 hover:text-foreground",
                    variant === "ghost" && "hover:bg-secondary/20 hover:text-foreground",
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
