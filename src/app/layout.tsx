import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'A modern dashboard built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body  
        // className="bg-nearBlack text-gray-100"
        className={cn(
          "min-h-screen font-sans antialiased grainy",
          inter.className
        )}
        >{children}</body>
    </html>
  );
}