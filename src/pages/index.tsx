import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import Meta from '@/components/Meta';
import Main from '@/layouts/Main';

interface Props {}

const Map = dynamic(import('@/components/Map/index'), {
  ssr: false,
});

const Index: NextPage<Props> = () => {
  return (
    <Main
      meta={
        <Meta
          title="Map | Vatsim Map"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      {/* <div className="px-6 mx-auto mb-6 max-w-site desktop:px-16"> */}
      <Map />
      {/* </div> */}
    </Main>
  );
};

export default Index;
