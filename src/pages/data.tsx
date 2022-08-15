import type { NextPage } from 'next';
import { useState } from 'react';

import Meta from '@/components/Meta';
import TabButtons from '@/components/P_Data/TabButtons';
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
        <TabButtons selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
    </Main>
  );
};

export default Data;
