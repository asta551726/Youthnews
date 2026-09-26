#!/usr/bin/env node
// Standalone on purpose: this runs with plain `node`, outside the Next.js
// bundler, so it can't use the "@/" import alias from lib/auth.js. It
// re-implements the same scrypt hashing so setup doesn't need a full
// Next.js build first.
const crypto = require('crypto');

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password -- <password>');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString('hex');
const derived = crypto.scryptSync(password, salt, 64).toString('hex');

console.log('\nAdd this line to your .env.local:\n');
console.log(`ADMIN_PASSWORD_HASH=${salt}:${derived}\n`);
