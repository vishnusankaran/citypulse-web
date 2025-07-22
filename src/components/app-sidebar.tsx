import * as React from 'react';
import {
  Camera,
  BarChart3,
  LayoutDashboard,
  Database,
  FileText,
  FileSpreadsheet,
  Folder,
  HelpCircle,
  List,
  FileBarChart,
  Search,
  Settings,
  Users,
  Mountain,
} from 'lucide-react';
import { createIcon } from '@/components/icons';

import { Account } from '@/components/account';
import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { ThemeToggle } from './theme-toggle';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: createIcon(LayoutDashboard),
    },
    {
      title: 'Lifecycle',
      url: '#',
      icon: createIcon(List),
    },
    {
      title: 'Analytics',
      url: '#',
      icon: createIcon(BarChart3),
    },
    {
      title: 'Projects',
      url: '#',
      icon: createIcon(Folder),
    },
    {
      title: 'Team',
      url: '#',
      icon: createIcon(Users),
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: createIcon(Camera),
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: createIcon(FileText),
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: createIcon(FileSpreadsheet),
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: createIcon(Settings),
    },
    {
      title: 'Get Help',
      url: '#',
      icon: createIcon(HelpCircle),
    },
    {
      title: 'Search',
      url: '#',
      icon: createIcon(Search),
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: createIcon(Database),
    },
    {
      name: 'Reports',
      url: '#',
      icon: createIcon(FileBarChart),
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: createIcon(FileText),
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="flex items-center gap-2">
                <Mountain className="h-6 w-6" />
                <span className="text-base font-semibold">Buzooka</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <div className="py-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 group-data-[collapsible=icon]:hidden">
            Main
          </div>
          <NavMain items={data.navMain} />
        </div>
        {/* Documents Section */}
        <div className="py-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 group-data-[collapsible=icon]:hidden">
            Documents
          </div>
          <NavDocuments items={data.documents} />
        </div>
        {/* Settings Section */}
        <div className="py-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 group-data-[collapsible=icon]:hidden">
            Settings
          </div>
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-center pb-2 border-b">
            <ThemeToggle />
          </div>
          {/* User info removed, only NavUser remains */}
          <NavUser user={data.user} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
