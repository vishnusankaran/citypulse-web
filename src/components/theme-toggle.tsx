import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/lib/theme-provider';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';
  const label = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';

  const handleToggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <Button
      variant={'outline'}
      size="sm"
      aria-label={label}
      onClick={handleToggle}
      className="p-2 px-3 h-auto w-auto mb-2"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="ml-1 text-xs group-data-[collapsible=icon]:hidden">
        {label}
      </span>
    </Button>
  );
}
