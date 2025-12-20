'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';

export default function BackgroundEffect() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transformations for background opacity/colors/scale based on scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const aboutGlowOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 0.5, 0]);
  const aboutGlowScale = useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#020205]">
      {/* Interactive Grid Pattern - The architectural foundation */}
      <InteractiveGridPattern
        className="opacity-[0.12] [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
        width={50}
        height={50}
        squares={[60, 60]}
        squaresClassName="hover:fill-blue-500/30 transition-all duration-200"
      />

      {/* Primary Hero Atmosphere (Cobalt & Emerald) */}
      <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
        <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                x: [0, 40, 0],
                y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[160px]" 
        />
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                x: [0, -60, 0],
                y: [0, -30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] left-[-20%] w-[900px] h-[900px] bg-emerald-500/10 rounded-full blur-[160px]" 
        />
        {/* Subtle Accent Glow */}
        <motion.div 
            animate={{ 
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] left-[30%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[180px]" 
        />
      </motion.div>

      {/* Deep Section Grain/Noise Overlay (Subtle Pro Touch) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grain-y.vercel.app/noise.svg')]" />

      {/* Dynamic Content Transition Layer */}
      <motion.div 
        style={{ 
            opacity: aboutGlowOpacity,
            scale: aboutGlowScale
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-[100px]"
      />

      {/* Global Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020205_100%)] opacity-60" />
    </div>
  );
}
