'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Header() {

  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };


  return (
    <header className="bg-nearBlack shadow-sm p-4 lg:pl-10 lg:pr-10 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-600 bg-nearBlack text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Search"
        />
        <div className="relative">
          <button
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
            aria-label="User menu"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-white">John Doe</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-gray-200"
        >
          Log Out
        </button>
      </div>
      </div>
    </header>
  );
}