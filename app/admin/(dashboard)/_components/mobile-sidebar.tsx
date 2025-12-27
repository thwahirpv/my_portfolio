'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarNav } from './sidebar-nav';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';


export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden cursor-pointer">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-black border-r border-zinc-800 w-72 text-white">
        <div className="sr-only">
            <SheetTitle>Admin Navigation</SheetTitle>
            <SheetDescription>Mobile navigation menu</SheetDescription>
        </div>
        <SidebarNav onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
