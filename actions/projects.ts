
'use server';

import { db } from '@/db/drizzle';
import { projects } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getProjects() {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
}

export async function createProject(formData: FormData, imageUrl: string, imageUrl2?: string, imageUrl3?: string) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const liveDemoUrl = formData.get('liveDemoUrl') as string;
    const repoUrl = formData.get('repoUrl') as string;
    const techStackTags = (formData.get('techStackTags') as string).split(',').map(tag => tag.trim());

    await db.insert(projects).values({
        title,
        description,
        imageUrl,
        imageUrl2,
        imageUrl3,
        liveDemoUrl,
        repoUrl,
        techStackTags,
    });

    revalidatePath('/admin/projects');
    revalidatePath('/');
}

export async function updateProject(id: number, formData: FormData, imageUrl?: string, imageUrl2?: string, imageUrl3?: string) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const liveDemoUrl = formData.get('liveDemoUrl') as string;
    const repoUrl = formData.get('repoUrl') as string;
    const techStackTags = (formData.get('techStackTags') as string).split(',').map(tag => tag.trim());

    await db.update(projects).set({
        title,
        description,
        ...(imageUrl && { imageUrl }),
        ...(imageUrl2 && { imageUrl2 }),
        ...(imageUrl3 && { imageUrl3 }),
        liveDemoUrl,
        repoUrl,
        techStackTags,
    }).where(eq(projects.id, id));

    revalidatePath('/admin/projects');
    revalidatePath('/');
}

export async function deleteProject(id: number) {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath('/admin/projects');
    revalidatePath('/');
}
