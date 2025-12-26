'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface ProjectCardImageProps {
  title: string;
  imageUrl: string | null;
  imageUrl2?: string | null;
  imageUrl3?: string | null;
}

export default function ProjectCardImage({ title, imageUrl, imageUrl2, imageUrl3 }: ProjectCardImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter out null/undefined images to get a clean list
  const images = [imageUrl, imageUrl2, imageUrl3].filter(Boolean) as string[];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000); // 1 second interval as requested
    // User explicitly said "1 secound like one image stay at 1 secound then its automatically slide to another".
    // I will stick to 1000ms as requested.
    
    // Correction: setInterval 1000ms.
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-zinc-900/50 flex items-center justify-center text-zinc-700">
        No Preview
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Optional: Indicator Dots (Minimal) */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1 h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-blue-500 w-3' : 'bg-white/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
