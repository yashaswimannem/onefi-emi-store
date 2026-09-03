const fs = require('fs');
const path = require('path');

const target = process.argv[2]?.toLowerCase() || 'sqlite';
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (!fs.existsSync(schemaPath)) {
  console.error('schema.prisma not found');
  process.exit(1);
}

let content = fs.readFileSync(schemaPath, 'utf8');

if (target === 'postgres' || target === 'postgresql') {
  content = content.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
  console.log('Switched Prisma provider to: postgresql (for Vercel / Supabase / Neon / Render)');
} else {
  content = content.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
  console.log('Switched Prisma provider to: sqlite (for local development)');
}

fs.writeFileSync(schemaPath, content, 'utf8');
