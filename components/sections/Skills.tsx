
import { getSkills } from '@/actions/skills';
import Image from 'next/image';
import * as motion from 'framer-motion/client';

export default async function Skills() {
  const skills = await getSkills();

  // Sort skills by position
  const sortedSkills = skills.sort((a, b) => (a.position || 0) - (b.position || 0));

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-zinc-500 text-sm font-bold uppercase tracking-[0.5em] mb-4"
            >
              Skills
            </motion.h2>
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '3rem' }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.2 }}
               className="h-px bg-blue-600 mx-auto" 
            />
        </div>

        <div className="flex flex-wrap gap-6 md:gap-10 justify-center max-w-5xl mx-auto">
            {sortedSkills.map((skill, index) => (
            <motion.div 
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative flex flex-col items-center gap-3 transition-all duration-300 transform hover:-translate-y-1 cursor-default"
            >
                {/* Icon Container - Compact & Visible */}
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/5 group-hover:border-blue-500/30 transition-all duration-300 shadow-lg shadow-black/20">
                    {skill.iconUrl ? (
                        <div className="relative w-6 h-6">
                            <Image 
                                src={skill.iconUrl} 
                                alt={skill.name} 
                                fill 
                                className="object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_1px_rgba(255,255,255,0.2)]" 
                            />
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-900/10 text-blue-400 flex items-center justify-center font-bold text-sm">
                            {skill.name.substring(0, 2).toUpperCase()}
                        </div>
                    )}
                </div>
                
                <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white transition-colors tracking-[0.2em] uppercase">
                    {skill.name}
                </span>
            </motion.div>
            ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
