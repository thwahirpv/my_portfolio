
'use client';

import { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}
