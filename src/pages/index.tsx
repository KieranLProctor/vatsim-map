import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import Meta from '@/components/Meta';
import useVatsimData from '@/hooks/useVatsimData';
import Main from '@/layouts/Main';
import { AppConfig } from '@/utils/AppConfig';

interface Props {}

const MapDynamic = dynamic(import('@/components/Map/index'), {
  ssr: false,
});

const Index: NextPage<Props> = () => {
  const { pilots, isError } = useVatsimData();

  if (isError) console.error('Unable to load flights!');

  return (
    <Main
      meta={
        <Meta
          title={`Map | ${AppConfig.site_name}`}
          description={AppConfig.description}
        />
      }
    >
      <MapDynamic pilots={pilots ?? []} />
    </Main>
  );
};

export default Index;
