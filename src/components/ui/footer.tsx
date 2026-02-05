import Link from 'next/link';

export function Footer() {
    return (
        <footer className="py-12 border-t border-border/60 bg-background">
            <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-brand/80 to-brand-2/80" />
                        <span className="text-base font-semibold text-foreground">Aura UI</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Calm systems for production interfaces.
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <Link href="https://github.com" className="hover:text-foreground transition-colors">
                        GitHub
                    </Link>
                    <Link href="/license" className="hover:text-foreground transition-colors">
                        License
                    </Link>
                </div>
            </div>
        </footer>
    );
}
