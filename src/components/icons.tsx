import { Loader2, LucideProps, Command } from 'lucide-react';
import { type Icon as TablerIcon } from '@tabler/icons-react';
import { type LucideIcon } from 'lucide-react';

export type Icon = LucideProps;

export const Icons = {
  spinner: Loader2,
  logo: Command,
};

export function createIcon(Icon: LucideIcon): TablerIcon {
  return function IconWrapper(props: any) {
    return <Icon {...props} />;
  };
}
