import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/auth';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  if (isAdminAuthenticated()) {
    redirect('/admin/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-base px-4 text-white">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-panel p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          YouthNews
        </p>
        <h1 className="mt-1 text-2xl font-bold">Admin Login</h1>
        <p className="mt-1 text-sm text-white/50">Restricted access.</p>
        <LoginForm />
      </div>
    </main>
  );
}
