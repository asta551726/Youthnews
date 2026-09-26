import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'youthnews_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

export const SESSION_COOKIE = {
  name: SESSION_COOKIE_NAME,
  maxAge: SESSION_MAX_AGE_SECONDS,
};

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      'ADMIN_SESSION_SECRET is not set. Add it to .env.local (see .env.example).'
    );
  }
  return secret;
}

function getPasswordHash() {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    throw new Error(
      'ADMIN_PASSWORD_HASH is not set. Run "npm run hash-password -- <password>" and add the result to .env.local (see .env.example).'
    );
  }
  return hash;
}

/**
 * Hash a plaintext password into a "salt:key" string for ADMIN_PASSWORD_HASH.
 * Exposed here for reuse if you build a "change password" admin feature
 * later. scripts/hash-password.js re-implements this standalone, since that
 * script runs outside the Next.js bundler and can't use the "@/" alias.
 */
export function hashPassword(plainPassword) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(plainPassword, salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

export function verifyPassword(plainPassword) {
  const stored = getPasswordHash();
  const [salt, key] = stored.split(':');
  if (!salt || !key) return false;

  const derived = crypto.scryptSync(plainPassword, salt, 64);
  const keyBuffer = Buffer.from(key, 'hex');
  if (derived.length !== keyBuffer.length) return false;
  return crypto.timingSafeEqual(derived, keyBuffer);
}

function sign(value) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('hex');
}

export function createSessionToken() {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 });
  const encodedPayload = Buffer.from(payload).toString('base64url');
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;

  const separatorIndex = token.indexOf('.');
  if (separatorIndex === -1) return false;

  const encodedPayload = token.slice(0, separatorIndex);
  const signature = token.slice(separatorIndex + 1);
  if (!encodedPayload || !signature) return false;

  let expectedSignature;
  try {
    expectedSignature = sign(encodedPayload);
  } catch {
    return false;
  }

  const sigBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');
  if (sigBuffer.length === 0 || sigBuffer.length !== expectedBuffer.length) return false;
  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    return typeof payload.exp === 'number' && payload.exp > Date.now();
  } catch {
    return false;
  }
}

/** Read-only check — safe to call from Server Components, Route Handlers, etc. */
export function isAdminAuthenticated() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

/** Call at the top of a Server Component admin page to gate it. */
export function requireAdminSession() {
  if (!isAdminAuthenticated()) {
    redirect('/admin/login');
  }
}
