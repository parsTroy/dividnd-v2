import OverviewCard from '../components/OverviewCard';
import RecentSales from '../components/RecentDividends';
import Chart from '../components/Chart';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  // Mock data (replace with dynamic data fetching)
  const portfolioValue = {
    amount: '$125,000.00',
    change: '+$1,200.00 (Today)', // Daily profit/loss
    additionalInfo: '+$15,000.00 (Total Profit)', // Total profit/loss
  };

  const topStockNews = {
    amount: 'Apple Inc. (AAPL)',
    additionalInfo: 'Apple announces new product line...', // News snippet
  };

  const monthlyDividends = {
    amount: '$1,200.00',
    change: '+$50.00 from last month', // Change from last month
  };

  const annualDividends = {
    amount: '$14,400.00',
    change: '+$600.00 from last year', // Change from last year
  };

  const recentDividends = [
    {
      companyName: 'Apple Inc.',
      tickerSymbol: 'AAPL',
      amount: '$1,999.00',
      logo: '/images/apple-logo.png',
    },
    {
      companyName: 'Microsoft Corporation',
      tickerSymbol: 'MSFT',
      amount: '$39.00',
      logo: '/images/microsoft-logo.png',
    },
    {
      companyName: 'Tesla Inc.',
      tickerSymbol: 'TSLA',
      amount: '$299.00',
      logo: '/images/tesla-logo.png',
    },
    {
      companyName: 'Amazon.com Inc.',
      tickerSymbol: 'AMZN',
      amount: '$99.00',
      logo: '/images/amazon-logo.png',
    },
    {
      companyName: 'Google LLC',
      tickerSymbol: 'GOOGL',
      amount: '$39.00',
      logo: '/images/google-logo.png',
    },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');

  useEffect(() => {
    if (success) {
      // Refresh the session to reflect the updated role
      supabase.auth.refreshSession().then(({ data: { user } }) => {
        if (user) {
          router.push('/dashboard');
        }
      });
    }
  }, [success, router]);

  return (
    <>
      <div className="flex items-end">
        <h1 className="text-2xl font-bold mb-6 mr-2">USERS-NAME</h1>
        <h4 className="text-lg font-bold mb-6">PORTFOLIO-NAME</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <OverviewCard title="Portfolio Value" data={portfolioValue} />
        <OverviewCard title="Top Stock News" data={topStockNews} />
        <OverviewCard title="Monthly Dividends" data={monthlyDividends} />
        <OverviewCard title="Annual Dividends" data={annualDividends} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart />
        <RecentSales data={recentDividends} />
      </div>
    </>
  );
}