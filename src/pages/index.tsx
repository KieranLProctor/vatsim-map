import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-use';

import type Flight from '@/components/interfaces/Flight';
import Meta from '@/components/Meta';
import Main from '@/layouts/Main';
import { getAllLiveFlights } from '@/utils/Endpoints';

interface Props {}

const Map = dynamic(import('@/components/Map/index'), {
  ssr: false,
});

const Index: NextPage<Props> = () => {
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const flightsRes = useAsync(getAllLiveFlights);

  useEffect(() => {
    if (flightsRes.loading === true) return;

    if (flightsRes.value?.length === 0) return;

    // const allFlightsArr = Object.entries(flightsRes.value).map((entry) => {
    //   return { [entry[0]]: entry[1] };
    // });

    const allFlightsArr: any = Object.entries(flightsRes.value).map(
      (entry) => entry[1]
    );

    setAllFlights(allFlightsArr);
  }, [flightsRes]);

  return (
    <Main
      meta={
        <Meta
          title="Map | Vatsim Map"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <Map flights={allFlights} />
    </Main>
  );
};

export default Index;
