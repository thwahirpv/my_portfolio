
'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export function LogOutButton() {
  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start gap-2 text-red-500 hover:bg-red-950/30 hover:text-red-400 cursor-pointer"
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
    >
      <LogOut size={18} />
      Sign Out
    </Button>
  );
}
