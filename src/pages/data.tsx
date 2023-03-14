import type { NextPage } from 'next';
import { useState } from 'react';

import ConnectionsPerServerPieChart from '@/components/_Data/Charts/ConnectionsPerServerPieChart';
import TopXAircraftPieChart from '@/components/_Data/Charts/TopXAircraftPieChart';
import TopXDestinationPieChart from '@/components/_Data/Charts/TopXDestinationPieChart';
import TabButtons from '@/components/_Data/TabButtons';
import ATISTable from '@/components/_Data/Tables/ATISTable';
import ControllersTable from '@/components/_Data/Tables/ControllersTable';
import PilotsTable from '@/components/_Data/Tables/PilotsTable';
import PrefilesTable from '@/components/_Data/Tables/PrefilesTable';
import Meta from '@/components/Meta';
import StatCard from '@/components/StatCard';
import useDataElapsed from '@/hooks/useDataElapsed';
import useVatsimData from '@/hooks/useVatsimData';
import Main from '@/layouts/Main';
import { AppConfig } from '@/utils/AppConfig';

interface Props {}

const Data: NextPage<Props> = () => {
  const {
    general,
    pilots,
    controllers,
    atis,
    servers,
    prefiles,
    facilities,
    ratings,
    isLoading,
    isError,
  } = useVatsimData();
  const [selectedTab, setSelectedTab] = useState<string>('GENERAL');
  const { elapsedTime } = useDataElapsed(general);

  return (
    <Main
      meta={
        <Meta
          title={`Data | ${AppConfig.site_name}`}
          description={AppConfig.description}
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
                  <StatCard
                    title="Elapsed Data Refresh"
                    value={`${elapsedTime}s`}
                  />
                </dl>

                <dl className="mt-8 grid grid-cols-1 gap-5 tablet:grid-cols-3">
                  <TopXAircraftPieChart pilots={pilots} amount={10} />
                  <TopXDestinationPieChart pilots={pilots} amount={10} />
                  <ConnectionsPerServerPieChart
                    servers={servers}
                    pilots={pilots}
                  />
                </dl>
              </div>
            )}

            {selectedTab === 'PILOTS' && <PilotsTable pilots={pilots} />}

            {selectedTab === 'CONTROLLERS' && (
              <ControllersTable
                controllers={controllers}
                facilities={facilities}
                ratings={ratings}
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
