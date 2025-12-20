
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { useLoader } from '@/components/layout/LoaderContext';

const TypingEffect = ({ text }: { text: string }) => {
  const [index, setIndex] = useState(0);
  const { isDone } = useLoader();
  
  useEffect(() => {
    if (!isDone) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < text.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [text, isDone]);

  const displayedText = text.slice(0, index);

  return (
    <span className="text-blue-500">
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[3px] h-[1em] bg-blue-500 ml-1 align-middle"
      />
    </span>
  );
};

interface ProfileData {
  id: number;
  name: string;
  headline: string | null;
  bio: string | null;
  position: string | null;
  avatarUrl: string | null;
  resumeUrl: string | null;
}

export default function Hero({ profile }: { profile: ProfileData | null }) {
  const name = profile?.name || 'Thwahir PV';
  const position = profile?.position || 'Full Stack Developer';
  const description = profile?.headline || 'Building high-performance web applications with modern technologies.';

  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden relative">
      <div className="container mx-auto px-6 z-10 flex flex-col items-center text-center">
        {/* Text Content */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="max-w-4xl flex flex-col items-center"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-zinc-500 text-xs font-bold uppercase tracking-[0.5em] mb-8"
          >
            Hello, I am
          </motion.h2>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-8 text-white bg-gradient-to-b from-white via-white to-blue-500/50 bg-clip-text text-transparent">
            {name}
          </h1>

          <div className="text-2xl md:text-3xl font-light text-emerald-400 tracking-widest h-[1.5em] mb-10  md:mb-12">
            <TypingEffect text={position} />
          </div>

          <p className="text-md md:text-xl leading-[1.8] text-zinc-400 font-light tracking-wide max-w-2xl mb-12">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <Link href="#projects">
              <Button className="bg-blue-600 hover:bg-blue-700 text-sm font-medium cursor-pointer rounded-full shadow-lg shadow-blue-900/30 transition-all hover:scale-105 active:scale-95">
                View My Work
              </Button>
            </Link>
            <Link href="#contact">
              <Button variant="outline" className="border-zinc-800 text-sm font-medium cursor-pointer rounded-full hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95">
                Contact Me
              </Button>
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-8 px-8 py-3 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <Link href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-all transform hover:scale-125">
              <Github size={22} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-all transform hover:scale-125">
              <Linkedin size={22} />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-pink-400 transition-all transform hover:scale-125">
              <Instagram size={22} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
