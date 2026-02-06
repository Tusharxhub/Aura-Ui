import * as React from "react";

export interface PropDef {
    name: string;
    type: string;
    default?: string;
    description: string;
}

interface PropsTableProps {
    data?: PropDef[];
}

export function PropsTable({ data }: PropsTableProps) {
    if (!data || data.length === 0) {
        return null;
    }

    return (
        <div className="my-4 sm:my-6 w-full overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-secondary/10">
                    <tr className="border-b border-border/50">
                        <th className="p-2 sm:p-4 font-semibold text-foreground w-[20%]">Prop</th>
                        <th className="p-2 sm:p-4 font-semibold text-foreground w-[20%]">Type</th>
                        <th className="p-2 sm:p-4 font-semibold text-foreground w-[20%]">Default</th>
                        <th className="p-2 sm:p-4 font-semibold text-foreground w-[40%]">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((prop) => (
                        <tr key={prop.name} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                            <td className="p-2 sm:p-4 align-top font-bold text-foreground">
                                {prop.name}
                            </td>
                            <td className="p-2 sm:p-4 align-top">
                                <code className="text-xs font-mono bg-secondary px-2 py-1 rounded-md text-muted-foreground font-semibold border border-transparent">
                                    {prop.type}
                                </code>
                            </td>
                            <td className="p-2 sm:p-4 align-top">
                                {prop.default && prop.default !== "-" ? (
                                    <code className="text-xs font-mono text-muted-foreground">
                                        {prop.default}
                                    </code>
                                ) : (
                                    <span className="text-muted-foreground">-</span>
                                )}
                            </td>
                            <td className="p-2 sm:p-4 align-top text-muted-foreground leading-relaxed">
                                {prop.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
