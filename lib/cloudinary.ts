
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File, folder: string, customName?: string) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<{ public_id: string; secure_url: string }>((resolve, reject) => {
        const isImage = file.type.startsWith('image/');
        const extension = file.name.split('.').pop()?.toLowerCase();
        const isPdf = extension === 'pdf';

        // Revert: Treat PDF as 'raw' to avoid corruption.
        // Signed URLs support raw files perfectly.
        const resourceType = isImage ? 'auto' : 'raw';

        const uploadOptions: any = {
            folder: `portfolio/${folder}`,
            resource_type: resourceType,
            type: 'upload', // Explicitly public
        };

        if (customName) {
            // For custom names:
            // - Raw files MUST include extension within public_id for it to be part of the filename.
            // - Auto/Image files usually don't need it in public_id; Cloudinary appends format in URL.
            // However, to force "thwahirpv.pdf", if resource_type becomes 'image' (for PDF), 
            // the public_id 'thwahirpv' results in '.../thwahirpv.pdf' URL.
            // If resource_type is 'raw', public_id must be 'thwahirpv.pdf'.

            uploadOptions.public_id = resourceType === 'raw' ? `${customName}.${extension}` : customName;

            uploadOptions.unique_filename = false;
            uploadOptions.use_filename = false;
            uploadOptions.overwrite = true;
        } else {
            if (resourceType === 'raw') {
                const originalName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "_");
                uploadOptions.public_id = `${originalName}_${Date.now()}.${extension}`;
            } else {
                uploadOptions.use_filename = true;
                uploadOptions.unique_filename = true;
            }
        }

        cloudinary.uploader.upload_stream(
            uploadOptions,
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

export const getSignedDownloadUrl = (publicId: string, resourceType: string = 'raw', format?: string, version?: string) => {
    // Force attachment with specific filename
    // Cloudinary uses 'fl_attachment:name' to set Content-Disposition
    // For raw files, the extension is part of the public_id usually, but for attachment name we just give the base name.

    // If format is provided (e.g. pdf), appending it to attachment name ensures correct expectation in browser
    // Update: Cloudinary automatically appends extension to fl_attachment name.
    // Providing extension manually (e.g., thwahirpv.pdf) can cause 400 error or double extension (thwahirpv.pdf.pdf).
    // Simplified: Just use 'attachment' flag. Cloudinary handles the filename.
    // If we want custom name, we uses "attachment:customname" (no ext).
    // But 'attachment' is safest fallback if specific name is causing issues.

    // const attachmentName = `thwahirpv`;

    const options: any = {
        resource_type: resourceType,
        // flags: `attachment`, // Removing attachment flag to ensure basic access works first
        sign_url: true,
        secure: true,
        expires_at: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
    };

    if (format) options.format = format;
    if (version) options.version = version;

    return cloudinary.url(publicId, options);
};
