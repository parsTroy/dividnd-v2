import OverviewCard from '../components/OverviewCard';
import RecentSales from '../components/RecentDividends';
import Chart from '../components/Chart';

export default function DashboardPage() {
  // Mock data (replace with dynamic data fetching)
  const overviewData = {
    totalRevenue: { amount: '$45,231.89', change: '+20.1%' },
    subscriptions: { amount: '+2350', change: '+80.1%' },
    sales: { amount: '+12,234', change: '+19%' },
    activeNow: { amount: '+573', change: '+201 since last hour' },
  };

  const recentSales = [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '$1,999.00' },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '$39.00' },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '$299.00' },
    { name: 'William Kim', email: 'will@email.com', amount: '$99.00' },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '$39.00' },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <OverviewCard title="Total Revenue" data={overviewData.totalRevenue} />
        <OverviewCard title="Subscriptions" data={overviewData.subscriptions} />
        <OverviewCard title="Sales" data={overviewData.sales} />
        <OverviewCard title="Active Now" data={overviewData.activeNow} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart />
        <RecentSales data={recentSales} />
      </div>
    </>
  );
}