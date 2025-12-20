import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { admins } from '@/db/schema';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                const admin = await db.query.admins.findFirst({
                    where: eq(admins.email, email)
                });
                
                if (!admin) {
                    return null;
                }
                
                const passwordsMatch = await bcrypt.compare(password, admin.password);

                if (!passwordsMatch) {
                    return null;
                }

                return { id: admin.id.toString(), email: admin.email };
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPage = nextUrl.pathname.startsWith('/admin');
            const isLoginPage = nextUrl.pathname === '/admin/login';

            if (isAdminPage && !isLoginPage) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL('/admin/login', nextUrl));
            }

            if (isLoginPage && isLoggedIn) {
                return Response.redirect(new URL('/admin/dashboard', nextUrl));
            }

            return true;
        },
    },
});
