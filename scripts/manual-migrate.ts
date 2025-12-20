import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
import { db } from '../db/drizzle';
import { sql } from 'drizzle-orm';

async function main() {
    console.log('Running manual migration...');
    try {
        // Drop table to ensure clean state (DEV ONLY)
        await db.execute(sql`DROP TABLE IF EXISTS "messages";`);

        // Create table with correct schema
        await db.execute(sql`
            CREATE TABLE IF NOT EXISTS "messages" (
                "id" serial PRIMARY KEY NOT NULL,
                "name" text NOT NULL,
                "email" text NOT NULL,
                "message" text NOT NULL,
                "created_at" timestamp DEFAULT now()
            );
        `);
        console.log('Table "messages" reset successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    }
    process.exit(0);
}

main();
