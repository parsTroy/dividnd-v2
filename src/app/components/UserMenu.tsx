'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function UserMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="relative">
      <button className="flex items-center space-x-2 focus:outline-none">
        <img
          src="https://via.placeholder.com/40"
          alt="User profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-white">John Doe</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-nearBlack rounded-lg shadow-lg py-2">
        <button
          onClick={handleLogout}
          className="block w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-white text-left"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}