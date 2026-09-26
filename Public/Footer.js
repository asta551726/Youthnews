export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10 px-4 py-8 text-center text-sm text-white/40 sm:px-8">
      <p>© 2025 YouthNews · Stories for the next generation.</p>

      {/*
        Small, discreet admin entry point. It's a plain link (not hidden via
        JS) — but reaching it does nothing on its own. /admin/login is the
        only way in, and /admin/dashboard re-checks the session on the
        server regardless of how someone arrives at that URL.
      */}
      <a
        href="/admin/login"
        className="mt-3 inline-block text-xs text-white/20 transition hover:text-white/50"
      >
        Admin
      </a>
    </footer>
  );
}
