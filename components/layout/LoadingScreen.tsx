'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Artificial minimum duration to ensure the premium design is appreciated
    const startTime = Date.now();
    const minimumDuration = 2000; // 2 seconds minimum

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          checkAndFinish();
          return 100;
        }
        return prev + 0.8; // Smooth, steady progress
      });
    }, 15);

    const checkAndFinish = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minimumDuration - elapsed);
      
      setTimeout(() => {
        onFinished();
      }, remaining);
    };

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Premium Ambient Background Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-blue-600/10 rounded-full blur-[150px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-purple-600/10 rounded-full blur-[150px]" 
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-xs px-6">
        {/* Premium Minimal Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 overflow-hidden rounded-full relative mb-4">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 shadow-[0_0_25px_rgba(59,130,246,0.8)]" 
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Percent */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-zinc-500 font-mono text-[10px] tabular-nums tracking-[0.3em] uppercase"
        >
          Loading {Math.round(progress)}%
        </motion.div>
      </div>
    </motion.div>
  );
}
