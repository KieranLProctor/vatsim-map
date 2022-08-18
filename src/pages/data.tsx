import type { NextPage } from 'next';
import { useState } from 'react';

import TabButtons from '@/components/_Data/TabButtons';
import ControllersTable from '@/components/_Data/Tables/ControllersTable';
import PilotsTable from '@/components/_Data/Tables/PilotsTable';
import PrefilesTable from '@/components/_Data/Tables/PrefilesTable';
import Meta from '@/components/Meta';
import useVatsimData from '@/hooks/useVatsimData';
import Main from '@/layouts/Main';

interface Props {}

const Data: NextPage<Props> = () => {
  const {
    general,
    pilots,
    controllers,
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
              <h1>Currently {general.connected_clients} Active Flights!</h1>
            )}

            {selectedTab === 'PILOTS' && <PilotsTable pilots={pilots} />}

            {selectedTab === 'CONTROLLERS' && (
              <ControllersTable
                controllers={controllers}
                facilities={facilities}
              />
            )}

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
