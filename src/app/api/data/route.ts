import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    totalRevenue: { amount: '$45,231.89', change: '+20.1%' },
    subscriptions: { amount: '+2350', change: '+80.1%' },
    sales: { amount: '+12,234', change: '+19%' },
    activeNow: { amount: '+573', change: '+201 since last hour' },
  };
  return NextResponse.json(data);
}