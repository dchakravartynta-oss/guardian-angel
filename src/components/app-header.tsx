import { ShieldAlert } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <ShieldAlert className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary font-headline tracking-tight">
          Guardian Angel
        </h1>
      </div>
    </header>
  );
}
