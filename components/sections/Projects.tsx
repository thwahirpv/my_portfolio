
import { getProjects } from '@/actions/projects';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import * as motion from 'framer-motion/client';
import ProjectCardImage from './ProjectCardImage';

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="container mx-auto px-8 md:px-20">
        <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-zinc-500 text-xs font-bold uppercase tracking-[0.5em] mb-4"
            >
              Projects
            </motion.h2>
            <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '3rem' }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.2 }}
               className="h-px bg-blue-600 mx-auto" 
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden hover:border-blue-500/20 transition-all duration-700 shadow-2xl hover:shadow-blue-500/5"
            >
               {/* Hover Glow Effect */}
               <div className="absolute inset-0 bg-blue-500/[0.02] opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />

               {/* Image Wrapper with Scale Effect */}
               <div className="relative h-60 w-full overflow-hidden">
                 <ProjectCardImage 
                    title={project.title}
                    imageUrl={project.imageUrl}
                    imageUrl2={project.imageUrl2}
                    imageUrl3={project.imageUrl3}
                 />
                 
                 {/* Overlay */}
                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-sm z-20">
                    {project.liveDemoUrl && (
                        <Link href={project.liveDemoUrl} target="_blank">
                             <Button size="icon" className="rounded-full bg-white cursor-pointer text-black hover:bg-zinc-200 w-10 h-10">
                                <ArrowUpRight size={18} />
                             </Button>
                        </Link>
                    )}
                    {project.repoUrl && (
                        <Link href={project.repoUrl} target="_blank">
                             <Button size="icon" variant="outline" className="rounded-full cursor-pointer border-white/20 text-white hover:bg-white/10 w-10 h-10 backdrop-blur-sm">
                                <Github size={18} />
                             </Button>
                        </Link>
                    )}
                 </div>
               </div>

               <div className="p-7 relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStackTags && project.techStackTags.slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] md:text-[9px] uppercase font-bold tracking-widest text-zinc-500 group-hover:text-blue-400 group-hover:border-blue-500/10 transition-all duration-500">
                            {tag}
                        </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors duration-500">{project.title}</h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed tracking-wide line-clamp-2 mb-6 group-hover:text-zinc-300 transition-colors duration-500">{project.description}</p>
                  
                  <Link href={`/projects/${project.id}`} className="inline-flex items-center text-[10px] uppercase font-bold tracking-[0.25rem] text-blue-500 hover:text-white transition-colors group/link">
                      Learn More 
                      <ArrowUpRight size={12} className="ml-1 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </Link>
               </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
