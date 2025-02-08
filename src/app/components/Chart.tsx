'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart() {
  // Mock data for dividend payouts over the last 6 months
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Dividend Payouts ($)',
        data: [1200, 1500, 1800, 1400, 1600, 2000], // Example dividend payouts
        backgroundColor: '#ffffff', // Bar color
        borderColor: '#ffffff', // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#F3F4F6', // Light text color for legend
        },
      },
      title: {
        display: true,
        text: 'Dividend Payouts Over Time', // Updated chart title
        color: '#F3F4F6', // Light text color for title
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#F3F4F6', // Light text color for x-axis
        },
        grid: {
          color: '#374151', // Dark grid lines for x-axis
        },
      },
      y: {
        ticks: {
          color: '#F3F4F6', // Light text color for y-axis
        },
        grid: {
          color: '#374151', // Dark grid lines for y-axis
        },
      },
    },
  };

  return (
    <div className="bg-nearBlack p-6 rounded-lg shadow-md border border-gray-600">
      <Bar data={data} options={options} />
    </div>
  );
}