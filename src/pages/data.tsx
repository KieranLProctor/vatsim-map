import type { NextPage } from 'next';
import { useState } from 'react';

import Meta from '@/components/Meta';
import Main from '@/layouts/Main';

interface Props {}

const Data: NextPage<Props> = () => {
  const [selectedTab, setSelectedTab] = useState<string>('FLIGHTS');

  return (
    <Main
      meta={
        <Meta
          title="Data | Vatsim Map"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="mx-auto max-w-site px-8 py-12 tablet:px-16">
        <div className="flex space-x-2">
          <button
            type="button"
            className={`${
              selectedTab.toUpperCase() === 'FLIGHTS'
                ? 'border-zinc-600 bg-zinc-800 border'
                : ''
            } px-3 py-2 text-sm text-gray-400 hover:text-gray-200`}
            onClick={() => setSelectedTab('FLIGHTS')}
          >
            Flights
          </button>

          <button
            type="button"
            className={`${
              selectedTab.toUpperCase() === 'ATC'
                ? 'border-zinc-600 bg-zinc-800 border'
                : ''
            } px-3 py-2 text-sm text-gray-400 hover:text-gray-200`}
            onClick={() => setSelectedTab('ATC')}
          >
            ATC
          </button>

          <button
            type="button"
            className={`${
              selectedTab.toUpperCase() === 'AIRLINES'
                ? 'border-zinc-600 bg-zinc-800 border'
                : ''
            } px-3 py-2 text-sm text-gray-400 hover:text-gray-200`}
            onClick={() => setSelectedTab('AIRLINES')}
          >
            Airlines
          </button>

          <button
            type="button"
            className={`${
              selectedTab.toUpperCase() === 'AIRCRAFT'
                ? 'border-zinc-600 bg-zinc-800 border'
                : ''
            } px-3 py-2 text-sm text-gray-400 hover:text-gray-200`}
            onClick={() => setSelectedTab('AIRCRAFT')}
          >
            Aircraft
          </button>
        </div>
      </div>
    </Main>
  );
};

export default Data;
