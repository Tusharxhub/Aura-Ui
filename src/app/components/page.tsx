import { ComponentView } from "@/components/component-view";

// Button Registry
import PrimaryButton from "@/registry/buttons/primary-button";
import SecondaryButton from "@/registry/buttons/secondary-button";
import OutlineButton from "@/registry/buttons/outline-button";
import GhostButton from "@/registry/buttons/ghost-button";

// Input Registry
import TextInput from "@/registry/inputs/text-input";

// Card Registry
import FeatureCard from "@/registry/cards/feature-card";

export default function ComponentsPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="pt-32 pb-24 px-6 max-w-[1200px] mx-auto">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Aura Registry</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        A growing collection of copy-paste components.
                        Upload your components to <code>src/registry</code> to see them here.
                    </p>
                </div>

                <div className="space-y-16">

                    {/* Buttons Category */}
                    <section id="buttons" className="space-y-6">
                        <h2 className="text-2xl font-semibold text-foreground tracking-tight border-b border-border/50 pb-2">Buttons</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <ComponentView name="primary-button" category="buttons">
                                <PrimaryButton />
                            </ComponentView>
                            <ComponentView name="secondary-button" category="buttons">
                                <SecondaryButton />
                            </ComponentView>
                            <ComponentView name="outline-button" category="buttons">
                                <OutlineButton />
                            </ComponentView>
                            <ComponentView name="ghost-button" category="buttons">
                                <GhostButton />
                            </ComponentView>
                        </div>
                    </section>

                    {/* Inputs Category */}
                    <section id="inputs" className="space-y-6">
                        <h2 className="text-2xl font-semibold text-foreground tracking-tight border-b border-border/50 pb-2">Inputs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <ComponentView name="text-input" category="inputs">
                                <TextInput />
                            </ComponentView>
                        </div>
                    </section>

                    {/* Cards Category */}
                    <section id="cards" className="space-y-6">
                        <h2 className="text-2xl font-semibold text-foreground tracking-tight border-b border-border/50 pb-2">Cards</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <ComponentView name="feature-card" category="cards">
                                <FeatureCard />
                            </ComponentView>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
