import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

import type Pilot from '@/interfaces/Pilot';

interface Props {
  pilots: Pilot[];
  amount: number;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const TopXDeparturesPieChart: React.FC<Props> = ({ pilots, amount }) => {
  const departures = Array.from(
    new Set(pilots.map((pilot: Pilot) => pilot.flight_plan?.departure))
  );

  const departuresCount: object[] = [];
  departures.forEach((x) =>
    departuresCount.push({
      aircraft: x,
      count: pilots.filter((pilot: Pilot) => pilot.flight_plan?.arrival === x)
        .length,
    })
  );

  // Sort the array by highest amount first.
  departuresCount.sort((a: any, b: any) => b.count - a.count);

  // Select top X to be displayed in the chart.
  const data = {
    labels: Array.from(departuresCount.map((x: any) => x.aircraft)).slice(
      0,
      amount
    ),
    datasets: [
      {
        label: '# of pilots',
        data: Array.from(departuresCount.map((x: any) => x.count)).slice(
          0,
          amount
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="overflow-hidden border border-zinc-600 bg-zinc-800 px-4 py-5 tablet:p-6">
      <dt className="truncate text-sm font-medium text-gray-400">
        Top {amount} Departures
      </dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-200">
        <Pie data={data} />
      </dd>
    </div>
  );
};

export default TopXDeparturesPieChart;
