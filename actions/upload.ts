
'use server';

import { uploadImage } from '@/lib/cloudinary';

export async function uploadFile(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) {
        throw new Error('No file provided');
    }

    try {
        const result = await uploadImage(file, 'uploads');
        return { success: true, url: result.secure_url };
    } catch (error) {
        console.error('Upload failed:', error);
        return { success: false, error: 'Upload failed' };
    }
}
