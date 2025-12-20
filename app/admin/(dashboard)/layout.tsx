import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FolderKanban, Wrench, UserCircle } from 'lucide-react';
import { LogOutButton } from './_components/logout-button';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 p-6 flex flex-col fixed h-full bg-black z-20">
        <Link href="/admin/dashboard" className="block">
          <div className="font-bold text-xl mb-8 tracking-tighter cursor-pointer hover:text-blue-500 transition-colors">Admin Panel</div>
        </Link>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-zinc-900 hover:text-white cursor-pointer">
              <LayoutDashboard size={18} />
              Overview
            </Button>
          </Link>
          <Link href="/admin/projects">
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-zinc-900 hover:text-white cursor-pointer">
              <FolderKanban size={18} />
              Projects
            </Button>
          </Link>
          <Link href="/admin/skills">
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-zinc-900 hover:text-white cursor-pointer">
              <Wrench size={18} />
              Skills
            </Button>
          </Link>
          <Link href="/admin/profile">
            <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-zinc-900 hover:text-white cursor-pointer">
              <UserCircle size={18} />
              Profile
            </Button>
          </Link>
        </nav>

        <div className="pt-6 border-t border-zinc-800">
          <LogOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto ml-64">
        {children}
      </main>
    </div>
  );
}
