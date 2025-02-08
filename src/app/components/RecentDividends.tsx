import React, { JSX } from 'react';
import Image from 'next/image'

interface Dividend {
  companyName: string;
  tickerSymbol: string;
  amount: string;
  logo: string;
}

interface RecentDividendsProps {
  data: Dividend[];
}

export default function RecentDividends({ data }: RecentDividendsProps) {
  return (
    <div className="bg-nearBlack p-6 rounded-lg shadow-md border border-gray-600">
      <h4 className="text-lg font-semibold text-white mb-6">
        Recent Dividend Disbursements
      </h4>
      <ul className="space-y-4">
        {data.map((dividend, index) => (
          <li key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                className="w-10 h-10 rounded-full"
                src={dividend.logo}
                width={500}
                height={500}
                style={{ objectFit: 'cover' }}
                alt={dividend.companyName}
              />
              <div>
                <p className="font-medium text-white">{dividend.companyName}</p>
                <p className="text-sm text-gray-400">{dividend.tickerSymbol}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">{dividend.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}