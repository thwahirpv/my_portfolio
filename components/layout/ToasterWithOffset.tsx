'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

export function ToasterWithOffset() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <Toaster 
      position="top-center" 
      className={isAdmin ? 'admin-offset' : ''} 
    />
  );
}
