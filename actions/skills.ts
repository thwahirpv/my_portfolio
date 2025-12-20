
'use server';

import { db } from '@/db/drizzle';
import { skills } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getSkills() {
    return await db.select().from(skills).orderBy(asc(skills.position));
}

export async function createSkill(formData: FormData, iconUrl: string) {
    const name = formData.get('name') as string;
    const position = parseInt(formData.get('position') as string) || 0;

    await db.insert(skills).values({
        name,
        position,
        iconUrl,
    });

    revalidatePath('/admin/skills');
    revalidatePath('/');
}

export async function deleteSkill(id: number) {
    await db.delete(skills).where(eq(skills.id, id));
    revalidatePath('/admin/skills');
    revalidatePath('/');
}
