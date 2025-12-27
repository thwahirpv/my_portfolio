import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FolderKanban, Wrench, UserCircle } from 'lucide-react';
import { LogOutButton } from './_components/logout-button';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SidebarNav } from './_components/sidebar-nav';
import { MobileSidebar } from './_components/mobile-sidebar';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-zinc-800 hidden lg:flex flex-col fixed h-full bg-black z-20">
        <SidebarNav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 border-b border-zinc-800 flex items-center px-4 bg-black sticky top-0 z-10">
           <MobileSidebar />
           <div className="ml-4 font-bold text-lg">Admin Panel</div>
        </div>
        
        <div className="p-4 md:p-8 overflow-y-auto flex-1">
           {children}
        </div>
      </main>
    </div>
  );
}
