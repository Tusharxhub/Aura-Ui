import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function FeatureCard() {
    return (
        <Card className="w-full max-w-sm hover:border-brand/50 transition-colors cursor-pointer group">
            <CardHeader>
                <CardTitle className="group-hover:text-brand transition-colors">Feature Card</CardTitle>
                <CardDescription>A card highlighting a specific feature.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Clicking this card could lead to a detailed feature page or trigger an action.
                </p>
                <div className="flex items-center text-sm font-medium text-brand">
                    Learn more <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </CardContent>
        </Card>
    );
}
