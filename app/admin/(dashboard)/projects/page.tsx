
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getProjects } from '@/actions/projects';
import { Plus, Pencil } from 'lucide-react';
import Image from 'next/image';
import { DeleteProjectButton } from './_components/delete-project-button';

export default async function AdminProjects() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/admin/projects/new">
          <Button className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <Plus size={18} className="mr-1" />
            Add Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-zinc-900 border-zinc-800 text-white overflow-hidden">
            <div className="relative h-48 w-full">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                  No Image
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="truncate">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end gap-2">
                <Link href={`/admin/projects/${project.id}`}>
                  <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800 cursor-pointer">
                    <Pencil size={16} />
                  </Button>
                </Link>
                <DeleteProjectButton id={project.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
