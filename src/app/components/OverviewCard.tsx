import React from 'react';

interface OverviewCardProps {
  title: string;
  data: {
    amount: string;
    change?: string; // Optional for profit/loss
    additionalInfo?: string; // Optional for extra details
  };
}

export default function OverviewCard({ title, data }: OverviewCardProps) {
  return (
    <div className="bg-nearBlack p-6 rounded-lg shadow-md border border-gray-600">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="text-2xl font-bold mt-2 text-white">{data.amount}</p>
      {data.change && (
        <p className="text-sm text-green-400 mt-1">{data.change}</p>
      )}
      {data.additionalInfo && (
        <p className="text-sm text-gray-400 mt-1">{data.additionalInfo}</p>
      )}
    </div>
  );
}