import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

import type Pilot from '@/interfaces/Pilot';
import type Server from '@/interfaces/Server';

interface Props {
  servers: Server[];
  pilots: Pilot[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const ConnectionsPerServerPieChart: React.FC<Props> = ({ servers, pilots }) => {
  const serverLocations = Array.from(
    new Set(servers.map((server: Server) => server.name))
  );

  const serverLocationCount: object[] = [];
  serverLocations.forEach((x) =>
    serverLocationCount.push({
      server: x,
      count: pilots.filter((pilot: Pilot) => pilot.server === x).length,
    })
  );

  // Sort the array by highest amount first.
  serverLocationCount.sort((a: any, b: any) => b.count - a.count);

  // Select top 10 to be displayed in the chart.
  const data = {
    labels: Array.from(serverLocationCount.map((x: any) => x.server)),
    datasets: [
      {
        label: '# of connections per server',
        data: Array.from(serverLocationCount.map((x: any) => x.count)),
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
        Connections Per Server
      </dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-200">
        <Pie data={data} />
      </dd>
    </div>
  );
};

export default ConnectionsPerServerPieChart;
