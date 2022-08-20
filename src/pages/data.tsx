import type { NextPage } from 'next';
import { useState } from 'react';

import TabButtons from '@/components/_Data/TabButtons';
import ATISTable from '@/components/_Data/Tables/ATISTable';
import ControllersTable from '@/components/_Data/Tables/ControllersTable';
import PilotsTable from '@/components/_Data/Tables/PilotsTable';
import PrefilesTable from '@/components/_Data/Tables/PrefilesTable';
import Meta from '@/components/Meta';
import StatCard from '@/components/StatCard';
import useVatsimData from '@/hooks/useVatsimData';
import Main from '@/layouts/Main';

interface Props {}

const Data: NextPage<Props> = () => {
  const {
    general,
    pilots,
    controllers,
    atis,
    facilities,
    prefiles,
    isLoading,
    isError,
  } = useVatsimData();
  const [selectedTab, setSelectedTab] = useState<string>('GENERAL');

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
        <TabButtons selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {!isLoading && !isError && (
          <>
            {selectedTab === 'GENERAL' && (
              <div className="mt-6">
                <h3 className="text-lg font-medium leading-6 text-gray-200">
                  Live
                </h3>
                <dl className="mt-5 grid grid-cols-1 gap-5 tablet:grid-cols-4">
                  <StatCard
                    title="Total Connections"
                    value={general.connected_clients}
                  />
                  <StatCard title="Total Pilots" value={pilots.length} />
                  <StatCard
                    title="Total Controllers"
                    value={controllers.length}
                  />
                  <StatCard title="Total ATIS" value={atis.length} />
                </dl>
              </div>
            )}

            {selectedTab === 'PILOTS' && <PilotsTable pilots={pilots} />}

            {selectedTab === 'CONTROLLERS' && (
              <ControllersTable
                controllers={controllers}
                facilities={facilities}
              />
            )}

            {selectedTab === 'ATIS' && <ATISTable atis={atis} />}

            {selectedTab === 'PREFILES' && (
              <PrefilesTable prefiles={prefiles} />
            )}
          </>
        )}
      </div>
    </Main>
  );
};

export default Data;
