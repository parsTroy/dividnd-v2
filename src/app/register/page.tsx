'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Step 1: Sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    // Step 2: Insert the user into the Prisma-managed `User` table
    const { data: userData, error: userError } = await supabase
      .from('User')
      .insert([{ id: authData.user?.id, email, createdAt: new Date(), updatedAt: new Date() }]);

    if (userError) {
      setError(userError.message);
      return;
    }

    setMessage('Check your email for a confirmation link.');
    setTimeout(() => {
      router.push('/login');
    }, 3000); // Redirect to login after 3 seconds
  };

  return (
    <div className="min-h-screen bg-nearBlack text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <button
          type="submit"
          className={buttonVariants({ size: 'lg', className: 'w-full' })}
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}