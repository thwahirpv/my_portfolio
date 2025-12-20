import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://thwahir.online';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Hide admin routes from crawlers
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
