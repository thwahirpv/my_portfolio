'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FolderKanban, Wrench, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogOutButton } from './logout-button';

interface SidebarNavProps {
  onLinkClick?: () => void;
}

export function SidebarNav({ onLinkClick }: SidebarNavProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: '/admin/dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
      active: pathname === '/admin/dashboard',
    },
    {
      href: '/admin/projects',
      label: 'Projects',
      icon: FolderKanban,
      active: pathname.startsWith('/admin/projects'),
    },
    {
      href: '/admin/skills',
      label: 'Skills',
      icon: Wrench,
      active: pathname.startsWith('/admin/skills'),
    },
    {
      href: '/admin/profile',
      label: 'Profile',
      icon: UserCircle,
      active: pathname.startsWith('/admin/profile'),
    },
  ];

  return (
    <div className="flex flex-col h-full">
       <Link href="/admin/dashboard" className="block mb-8 px-6 pt-6" onClick={onLinkClick}>
          <div className="font-bold text-xl tracking-tighter cursor-pointer hover:text-blue-500 transition-colors">Admin Panel</div>
       </Link>

       <nav className="flex-1 space-y-2 px-4">
        {routes.map((route) => (
          <Link key={route.href} href={route.href} onClick={onLinkClick}>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start gap-2 hover:bg-zinc-900 hover:text-white cursor-pointer mb-1",
                route.active && "bg-zinc-900 text-white"
              )}
            >
              <route.icon size={18} />
              {route.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-zinc-800 mt-auto">
         <LogOutButton />
      </div>
    </div>
  );
}
