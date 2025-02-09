'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Navigation() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };
  
  return (
    <nav className="bg-nearBlack p-4 lg:pl-10 lg:pr-10">
      <ul className="flex space-x-6">
        <li>
          <Link
            href="/dashboard"
            className="text-white hover:text-gray-400 transition-colors"
          >
            Overview
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/reports"
            className="text-white hover:text-gray-400 transition-colors"
          >
            Reports
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings"
            className="text-white hover:text-gray-400 transition-colors"
          >
            Settings
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-gray-200"
          >
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
}