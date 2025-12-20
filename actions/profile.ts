'use server';

import { db } from '@/db/drizzle';
import { profiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Fetch the profile (Singleton pattern: usually ID 1 or the first row)
export async function getProfile() {
    const profile = await db.query.profiles.findFirst();
    return profile;
}

// Update the profile. If it doesn't exist, create it.
export async function updateProfile(formData: FormData) {
    const name = formData.get('name') as string;
    const headline = formData.get('headline') as string;
    const bio = formData.get('bio') as string;
    const position = formData.get('position') as string;
    const avatarUrl = formData.get('avatarUrl') as string;
    const resumeUrl = formData.get('resumeUrl') as string;

    try {
        const existingProfile = await db.query.profiles.findFirst();

        if (existingProfile) {
            await db.update(profiles)
                .set({
                    name,
                    headline,
                    bio,
                    position,
                    avatarUrl,
                    resumeUrl,
                })
                .where(eq(profiles.id, existingProfile.id));
        } else {
            await db.insert(profiles).values({
                name,
                headline,
                bio,
                position,
                avatarUrl,
                resumeUrl,
            });
        }

        revalidatePath('/admin/profile');
        revalidatePath('/admin/dashboard');
        revalidatePath('/'); // Update public home page too
        return { success: true, message: 'Profile updated successfully.' };
    } catch (error) {
        console.error('Failed to update profile:', error);
        return { success: false, message: 'Failed to update profile.' };
    }
}
