import { ComponentView } from "@/components/component-view";
import { ComponentSearch } from "@/components/component-search";
import { registry } from "@/registry/index";
import * as React from "react";

export default function ComponentsPage() {
    // Group components by category
    const componentsByCategory = Object.values(registry).reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, typeof registry[keyof typeof registry][]>);

    // Flatten list for search - include both pages and components
    const allComponents = [
        { name: 'Home', slug: '', category: 'Pages', description: 'Go to home page' },
        { name: 'Components', slug: 'components', category: 'Pages', description: 'View all components' },
        ...Object.values(registry).map(item => ({
            name: item.name,
            slug: item.slug,
            category: item.category,
            description: `${item.category} component`,
        })),
    ];

    const categories = Object.keys(componentsByCategory);

    return (
        <div className="min-h-screen bg-background">
            <div className="pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-[1200px] mx-auto">
                <div className="mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Aura Registry</h1>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-6">
                        A growing collection of copy-paste components.
                        Upload your components to <code>src/registry</code> to see them here.
                    </p>
                    <div className="max-w-md">
                        <ComponentSearch items={allComponents} />
                    </div>
                </div>

                <div className="space-y-12 sm:space-y-16">
                    {categories.map((category) => (
                        <section key={category} id={category} className="space-y-4 sm:space-y-6">
                            <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight border-b border-border/50 pb-2 capitalize">
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {componentsByCategory[category].map((item) => {
                                    const Component = item.component;
                                    return (
                                        <ComponentView key={item.slug} name={item.name} slug={item.slug} category={item.category}>
                                            <React.Suspense fallback={<div className="text-sm text-center text-muted-foreground">Loading...</div>}>
                                                <Component />
                                            </React.Suspense>
                                        </ComponentView>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
