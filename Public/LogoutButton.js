'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-accent hover:text-accent disabled:opacity-50"
    >
      {loading ? 'Logging out…' : 'Logout'}
    </button>
  );
}
