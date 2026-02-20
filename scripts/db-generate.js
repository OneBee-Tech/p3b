const { exec } = require('child_process');
require('dotenv').config();

console.log('Running Prisma Generate with DATABASE_URL:', process.env.DATABASE_URL ? 'FOUND' : 'MISSING');

const command = 'npx prisma generate';

const child = exec(command, {
    env: { ...process.env },
});

child.stdout.on('data', (data) => {
    console.log(data.toString());
});

child.stderr.on('data', (data) => {
    console.error(data.toString());
});

child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
});
