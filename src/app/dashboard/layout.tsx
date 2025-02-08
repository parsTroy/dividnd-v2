import Header from '@/app/components/Header';
import Navigation from '@/app/components/Navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-nearBlack text-white">
      <Header />
      <Navigation />
      <main className="flex-1 p-6 md:p-6 lg:p-10">{children}</main>
    </div>
  );
}