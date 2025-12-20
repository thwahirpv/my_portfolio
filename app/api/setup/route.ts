import { db } from '@/db/drizzle';
import { admins } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Manual Migration (Create Table)
        await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "admins" (
        "id" serial PRIMARY KEY NOT NULL,
        "email" text NOT NULL,
        "password" text NOT NULL,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "admins_email_unique" UNIQUE("email")
      );
    `);

        // 2. Seed Admin
        const email = 'thwahirxpv@gmail.com';
        const password = 'Thw@9895,.';
        const hashedPassword = await hash(password, 10);

        await db.insert(admins).values({
            email,
            password: hashedPassword,
        }).onConflictDoNothing();

        return NextResponse.json({ message: 'Setup Complete: Table created and Admin seeded.' });
    } catch (error) {
        console.error('Setup failed:', error);
        return NextResponse.json({ error: 'Setup Failed', details: String(error) }, { status: 500 });
    }
}
