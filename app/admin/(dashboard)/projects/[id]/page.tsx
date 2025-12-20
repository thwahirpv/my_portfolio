
import { notFound } from 'next/navigation';
import { db } from '@/db/drizzle';
import { projects } from '@/db/schema';
import { eq } from 'drizzle-orm';
import ProjectForm from '../../_components/project-form';

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, parseInt(params.id))
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      <ProjectForm initialData={project} isEditing />
    </div>
  );
}
