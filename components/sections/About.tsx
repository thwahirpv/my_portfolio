'use client';

import { motion } from 'framer-motion';

interface ProfileData {
  id: number;
  name: string;
  headline: string | null;
  bio: string | null;
  position: string | null;
  avatarUrl: string | null;
  resumeUrl: string | null;
}

export default function About({ profile }: { profile: ProfileData | null }) {
  const bio = profile?.bio || "I am a passionate Full Stack Developer with a knack for building robust and scalable web applications. My journey in tech started with a curiosity about how things work on the internet, which led me to dive deep into both frontend and backend technologies.\n\nI enjoy solving complex problems and turning ideas into reality using modern tools like Next.js, React, and Node.js. When I'm not coding, I'm likely exploring new tech trends or contributing to open source.";

  // Split bio into paragraphs for better animation control
  const paragraphs = bio.split('\n\n').filter(p => p.trim() !== '');

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <h2 className="text-zinc-500 text-sm font-bold uppercase tracking-[0.5em] mb-4">
              About Me
            </h2>
            <div className="w-12 h-px bg-blue-600 mx-auto" />
          </motion.div>

          {/* Bio Content - "Book Looking" Design with Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-blue-500/5"
          >
            {/* Elegant Vertical Line Accent */}
            <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: '80%' }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
               className="absolute left-8 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-blue-600/50 via-zinc-500/20 to-transparent hidden md:block"
            />

            <div className="space-y-12 md:pl-12">
               {paragraphs.map((paragraph, index) => (
                 <motion.p
                   key={index}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.8, delay: index * 0.2 + 0.3, ease: "easeOut" }}
                   className={`text-md md:text-lg leading-[1.8] text-zinc-300 font-light tracking-wide ${
                     index === 0 ? 'first-letter:text-6xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left' : ''
                   }`}
                 >
                   {paragraph}
                 </motion.p>
               ))}
            </div>

            {/* Signature-like closure */}
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: paragraphs.length * 0.2 + 0.8 }}
               className="mt-16 flex items-center gap-4 md:pl-12"
            >
              <div className="h-px w-8 bg-zinc-800" />
              <span className="text-zinc-500 font-serif italic tracking-widest text-sm md:text-md">
                The Journey of {profile?.name || 'Thwahir'}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

