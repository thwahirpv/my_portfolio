import { NextRequest, NextResponse } from 'next/server';
import { getSignedDownloadUrl } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const fileUrl = searchParams.get('url');

    if (!fileUrl) {
        return NextResponse.json({ error: 'Missing file URL' }, { status: 400 });
    }

    try {
        console.log(`[Download API] Incoming URL: ${fileUrl}`);

        // Extract public_id, resource_type, version, and format from the URL
        const urlParts = fileUrl.split('/upload/');
        if (urlParts.length < 2) {
            console.error('[Download API] Invalid structure');
            return NextResponse.json({ error: 'Invalid Cloudinary URL structure' }, { status: 400 });
        }

        const pathWithVersion = urlParts[1];
        const pathParts = pathWithVersion.split('/');

        let version: string | undefined = undefined;
        // Check if first part is a version (starts with v and follows by numbers)
        if (pathParts[0].startsWith('v') && !isNaN(Number(pathParts[0].substring(1)))) {
            version = pathParts.shift()?.substring(1); // Remove 'v' prefix, store only number
        }

        const publicIdWithExt = pathParts.join('/');

        let resourceType = 'raw';
        // Check for /image/upload or /auto/upload or just /upload (though usually preceded by type)
        if (fileUrl.includes('/image/upload') || fileUrl.includes('/auto/upload')) {
            resourceType = 'image'; // auto maps to image in URL generation often
        }

        let publicId = publicIdWithExt;
        let format: string | undefined = undefined;

        if (resourceType === 'image') {
            const dotIndex = publicId.lastIndexOf('.');
            if (dotIndex !== -1) {
                format = publicId.substring(dotIndex + 1);
                publicId = publicId.substring(0, dotIndex);
            } else {
                // Fallback: If no extension found and it's an image/auto resource (resume), force pdf.
                // This fixes cases where DB URL might lack extension or parsing failed.
                console.log('[Download API] No extension found for image resource, defaulting to pdf');
                format = 'pdf';
            }
        }

        console.log(`[Download API] DETAILS: 
            Original URL: ${fileUrl}
            Extracted Version (raw): ${urlParts[1].split('/')[0]}
            Parsed Version (no v): ${version}
            Resource Type: ${resourceType}
            Public ID (final): ${publicId}
            Format: ${format}
        `);

        // Ensure version is passed cleanly
        const signedUrl = getSignedDownloadUrl(publicId, resourceType, format, version);

        console.log(`[Download API] Generated Signed URL: ${signedUrl}`);

        return NextResponse.redirect(signedUrl);

    } catch (error: any) {
        console.error('Download signing error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}
