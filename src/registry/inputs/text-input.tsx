import { Input } from "@/components/ui/input";

export default function TextInput() {
    return (
        <div className="w-full max-w-xs space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Username</label>
            <Input placeholder="Enter username..." />
        </div>
    );
}
