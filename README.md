# YouthNews

A Next.js starter covering two specific requests: a logo next to the site
name, and a separate, password-protected admin area.

I didn't have your actual project files — only `Youthnews.png` — so this is
a fresh build matching the screenshot, not an edit of existing code. If you
do have a working codebase already, share it and these two features can be
added into it directly instead of this standalone version.

The full news CMS and English-learning/quiz platform from your spec docs is
a much bigger build (real database, article editor, question bank, student
accounts, etc.). This starter gives you a working public homepage and a
genuinely auth-protected admin shell, structured so that work can be added
on top without redoing the auth layer.

## Setup

```bash
npm install
cp .env.example .env.local
npm run hash-password -- 1234
```

Copy the printed `ADMIN_PASSWORD_HASH=...` line into `.env.local`, then add
a session secret:

```bash
echo "ADMIN_SESSION_SECRET=$(openssl rand -hex 32)" >> .env.local
```

(No `openssl`? Any long random string pasted in by hand works fine.)

```bash
npm run dev
```

Open `http://localhost:3000`. The admin login is at `/admin/login` (linked,
small and discreet, at the bottom of the footer) — password `1234` until
you change it.

## How the admin auth works

- `POST /api/admin/login` checks the password **on the server** against
  `ADMIN_PASSWORD_HASH` (scrypt + timing-safe compare). The password is
  never sent to the browser in any form — not in HTML, not in a script, not
  in an API response.
- On success it sets an `httpOnly`, `Secure` (in production), signed
  session cookie. Client-side JS can't read it; it's tamper-evident
  (HMAC-signed with `ADMIN_SESSION_SECRET`) and expires after 8 hours.
- `/admin/dashboard` verifies that cookie **on the server**, before
  rendering anything, and redirects to `/admin/login` if it's missing or
  invalid — typing the URL directly doesn't get you in.
- `POST /api/admin/logout` clears the cookie.
- To protect a new admin page later: call `requireAdminSession()` from
  `lib/auth.js` at the top of the page. For a new admin API route: check
  `isAdminAuthenticated()` and return a 401 if it's false. Both are
  one-liners.

## Changing the password

```bash
npm run hash-password -- yournewpassword
```

Replace `ADMIN_PASSWORD_HASH` with the new output and restart/redeploy.

## Deploying (e.g. Vercel)

1. Push this to a Git repo and import it into Vercel.
2. Add `ADMIN_PASSWORD_HASH` and `ADMIN_SESSION_SECRET` as environment
   variables in the project settings.
3. Deploy — no database is required for what's here.

## Known limitations / suggested next steps

- One shared admin password, not per-user accounts. That matches what was
  asked; once you build the Super Admin / Editor / Author / Viewer roles
  from your spec, swap this for real user records plus a proper auth
  library (Auth.js, Lucia, etc.).
- No login rate-limiting yet — add it (e.g. Upstash Ratelimit) before this
  guards anything beyond a demo.
- The homepage's articles/categories/trending data are static placeholders
  matching your screenshot. Wiring them to a real database is the bigger
  CMS build.
- The mobile nav is a simple responsive stack, not a hamburger/off-canvas
  menu yet.
- `public/logo.svg` is a placeholder mark — drop in your real logo and
  update the one `src` line in `components/Sidebar.js` (any image format
  works, not just SVG).

## Project structure

```
app/
  page.js                Public homepage
  admin/login/           Login page + form
  admin/dashboard/       Protected dashboard
  api/admin/login/       POST — verifies password, sets the session cookie
  api/admin/logout/      POST — clears the session cookie
components/
  Sidebar.js             Brand block (name + logo) + nav
  Topbar.js              Search + icons
  Footer.js              Copyright + Admin link
lib/auth.js              Password hashing + session signing/verification
scripts/hash-password.js CLI: generate ADMIN_PASSWORD_HASH for any password
public/logo.svg          Placeholder logo
```
