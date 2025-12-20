import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { db } from '@/db/drizzle';
import { admins } from '@/db/schema';
import { hash } from 'bcryptjs';

async function main() {
    const email = 'thwahirxpv@gmail.com';
    const password = 'Thw@9895,.';

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(admins).values({
            email,
            password: hashedPassword,
        }).onConflictDoNothing();
        console.log('Admin seeded successfully');
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
    process.exit(0);
}

main();
