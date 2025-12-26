import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

try {
    // Hardcoded absolute path to ensure we find it
    const envPath = 'c:\\Users\\mohdt\\Desktop\\projects\\my_portfolio\\.env';
    if (fs.existsSync(envPath)) {
        console.log(`Loading .env from ${envPath}`);
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach((line) => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim();
                // Remove quotes if present
                const cleanValue = value.replace(/^["'](.*)["']$/, '$1');
                if (key && cleanValue) {
                    process.env[key] = cleanValue;
                }
            }
        });
    } else {
        console.error("File not found:", envPath);
    }
} catch (e) {
    console.error("Error loading .env manually:", e);
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function checkResource() {
    try {
        console.log("Checking resource: portfolio/uploads/thwahirpv.pdf");

        // Try raw first
        try {
            const resultRaw = await cloudinary.api.resource('portfolio/uploads/thwahirpv.pdf', {
                resource_type: 'raw'
            });
            console.log("--- RAW Resource Found ---");
            console.log("Type:", resultRaw.type);
            console.log("Access Mode:", resultRaw.access_mode);
            console.log("Public ID:", resultRaw.public_id);
            console.log("Secure URL:", resultRaw.secure_url);
            console.log("Url:", resultRaw.url);
        } catch (e: any) {
            console.log("Raw resource error:", e.message);
        }

        // Try image just in case
        try {
            const resultImage = await cloudinary.api.resource('portfolio/uploads/thwahirpv', {
                resource_type: 'image'
            });
            console.log("--- IMAGE Resource Found ---");
            console.log("Type:", resultImage.type);
            console.log("Access Mode:", resultImage.access_mode);
            console.log("Public ID:", resultImage.public_id);
        } catch (e: any) {
            // Ignore if not found
            console.log("Image resource error (expected if PDF is raw):", e.message);
        }

    } catch (error) {
        console.error("General Error:", error);
    }
}

checkResource();
