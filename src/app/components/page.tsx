export default function ComponentsPage() {
    return (
        <div className="py-24 px-6 max-w-[1200px] mx-auto min-h-[60vh]">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">All Components</h1>
                <p className="text-muted-foreground text-lg">
                    Explore our complete collection of premium UI components.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for future components list */}
                <div className="p-12 border border-dashed border-border rounded-xl flex items-center justify-center text-muted-foreground bg-secondary/5 col-span-full">
                    Component library documentation coming soon.
                </div>
            </div>
        </div>
    );
}
