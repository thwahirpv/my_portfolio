'use client';

import { useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/components/layout/LoadingScreen';
import { LoaderProvider, useLoader } from './LoaderContext';
import BackgroundEffect from './BackgroundEffect';

interface ProfileData {
  id: number;
  name: string;
  headline: string | null;
  bio: string | null;
  position: string | null;
  avatarUrl: string | null;
  resumeUrl: string | null;
}

interface HomeContentProps {
  profile: ProfileData | null;
  children: ReactNode;
}

function HomeContentInner({ profile, children }: HomeContentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { setIsDone } = useLoader();

  const handleFinished = () => {
    setIsLoading(false);
    // Notify after the reveal animation has progressed significantly
    setTimeout(() => {
      setIsDone(true);
    }, 800);
  };

  return (
    <>
      <BackgroundEffect />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" onFinished={handleFinished} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 0.98 : 1,
          y: isLoading ? 10 : 0
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Sophisticated easing
        className={isLoading ? 'fixed inset-0 overflow-hidden' : ''}
      >
        {children}
        
        {/* Footer */}
        <footer id="footer" className="py-12 mt- text-center text-zinc-600 text-sm border-t border-white/5">
          <p>© {new Date().getFullYear()} {profile?.name || 'Thwahir PV'}. All rights reserved.</p>
        </footer>
      </motion.div>
    </>
  );
}

export default function HomeContent(props: HomeContentProps) {
  return (
    <LoaderProvider>
      <HomeContentInner {...props} />
    </LoaderProvider>
  );
}
