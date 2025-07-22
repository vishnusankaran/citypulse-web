import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function SiteHeader() {
  // You can replace 'shadcn' with the actual user name from context if desired
  const userName = 'shadcn';
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <p className="text-muted-foreground text-sm">Welcome back, {userName}!</p>
    </header>
  );
}
