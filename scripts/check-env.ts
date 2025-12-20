import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log('Checking Environment...');
if (process.env.NEON_DATABASE_URL) {
    console.log('NEON_DATABASE_URL is set (Length: ' + process.env.NEON_DATABASE_URL.length + ')');
} else {
    console.error('NEON_DATABASE_URL is MISSING');
}

if (process.env.AUTH_SECRET) {
    console.log('AUTH_SECRET is set (Length: ' + process.env.AUTH_SECRET.length + ')');
} else {
    console.error('AUTH_SECRET is MISSING');
}
console.log('Done.');
