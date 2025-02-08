import Link from 'next/link';

export default function Navigation() {
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
      </ul>
    </nav>
  );
}