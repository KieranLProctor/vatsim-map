import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import Meta from '@/components/Meta';
import useVatsimData from '@/hooks/useVatsimData';
import Main from '@/layouts/Main';

interface Props {}

const MapDynamic = dynamic(import('@/components/Map/index'), {
  ssr: false,
});

const Index: NextPage<Props> = () => {
  const { pilots, isLoading, isError } = useVatsimData();

  console.log(pilots);

  if (isLoading || isError) return <></>;

  return (
    <Main
      meta={
        <Meta
          title="Map | Vatsim Map"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <MapDynamic pilots={pilots} />
    </Main>
  );
};

export default Index;
