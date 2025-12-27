
import { notFound } from 'next/navigation';
import { db } from '@/db/drizzle';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import ProjectGallery from '@/components/sections/ProjectGallery';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, parseInt(id))
  });

  if (!project) {
    notFound();
  }

  // Gather all valid images
  const galleryImages = [
    project.imageUrl,
    project.imageUrl2,
    project.imageUrl3
  ].filter(Boolean) as string[];

  return (
    <>
      <article className="min-h-screen bg-black pt-6 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/#projects">
          <Button variant="ghost" className="text-zinc-400 hover:text-white mb-8 pl-0 hover:bg-transparent">
            <ArrowLeft className="mr-2" size={20} />
            Back to Projects
          </Button>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
            {project.techStackTags && project.techStackTags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-blue-400">
                    {tag}
                </span>
            ))}
        </div>

        <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-12 border border-zinc-800 bg-zinc-900/50">
           <ProjectGallery images={galleryImages} title={project.title} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose prose-invert prose-lg text-zinc-300">
               <h3 className="text-2xl font-bold text-white mb-4">About the Project</h3>
               <p className="whitespace-pre-wrap">{project.description}</p>
            </div>

            <div className="space-y-6">
                <div className="bg-zinc-900 bg-opacity-50 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Project Links</h3>
                    <div className="space-y-3">
                        {project.liveDemoUrl && (
                            <Link href={project.liveDemoUrl} target="_blank" className="block">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-full shadow-lg shadow-blue-900/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                                    <ExternalLink size={18} className="mr-2" />
                                    Live Demo {
                                        project.adminDemoUrl && "(User)"
                                    }
                                </Button>
                            </Link>
                        )}
                        {project.adminDemoUrl && (
                            <Link href={project.adminDemoUrl} target="_blank" className="block">
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm font-medium rounded-full shadow-lg shadow-indigo-900/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                                    <ExternalLink size={18} className="mr-2" />
                                    Live Demo (Admin)
                                </Button>
                            </Link>
                        )}
                        
                        {project.repoUrl && (
                            <Link href={project.repoUrl} target="_blank" className="block">
                                <Button variant="outline" className="w-full border-zinc-700 text-white hover:bg-white hover:text-black text-sm font-medium rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer">
                                    <Github size={18} className="mr-2" />
                                    {
                                        project.backendRepoUrl ? "Frontend Code" : "Source Code"
                                    }
                                </Button>
                            </Link>
                        )}
                        {project.backendRepoUrl && (
                            <Link href={project.backendRepoUrl} target="_blank" className="block">
                                <Button variant="outline" className="w-full border-zinc-700 text-white hover:bg-white hover:text-black text-sm font-medium rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer">
                                    <Github size={18} className="mr-2" />
                                    Backend Code
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </article>
    </>
  );
}
