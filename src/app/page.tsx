import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { verifyAuth } from '@/lib/auth/verify-auth';

export default async function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/auth/login');
  }

  const isValidToken = await verifyAuth(token);

  if (!isValidToken) {
    redirect('/auth/login');
  }

  redirect('/dashboard');
} 