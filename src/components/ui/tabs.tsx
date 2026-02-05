"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TabsContext = React.createContext<{
    activeTab: string;
    setActiveTab: (id: string) => void;
} | null>(null);

export function Tabs({
    children,
    defaultValue,
    className,
}: {
    children: React.ReactNode;
    defaultValue: string;
    className?: string;
}) {
    const [activeTab, setActiveTab] = React.useState(defaultValue);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={cn("w-full", className)}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
                className
            )}
        >
            {children}
        </div>
    );
}

export function TabsTrigger({
    value,
    children,
    className,
}: {
    value: string;
    children: React.ReactNode;
    className?: string;
}) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsTrigger must be used within Tabs");

    const isActive = context.activeTab === value;

    return (
        <button
            onClick={() => context.setActiveTab(value)}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative z-10",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
                className
            )}
        >
            {isActive && (
                <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-background rounded-md shadow-sm -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            {children}
        </button>
    );
}

export function TabsContent({
    value,
    children,
    className,
}: {
    value: string;
    children: React.ReactNode;
    className?: string;
}) {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error("TabsContent must be used within Tabs");

    if (context.activeTab !== value) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
        >
            {children}
        </motion.div>
    );
}
