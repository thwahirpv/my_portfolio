
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File, folder: string) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: `portfolio/${folder}` },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result as { public_id: string; secure_url: string });
            }
        ).end(buffer);
    });
};
