'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Incorrect password');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm text-white/70">
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoFocus
          required
          className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-white outline-none focus:border-accent"
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-1 rounded-lg bg-accent px-4 py-2 font-semibold text-black transition hover:brightness-95 disabled:opacity-60"
      >
        {loading ? 'Checking…' : 'Log in'}
      </button>
    </form>
  );
}
