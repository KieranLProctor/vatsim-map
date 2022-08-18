import useSWR from 'swr';

import type VatsimData from '@/interfaces/VatsimData';

const FETCHER = (args: string) => fetch(args).then((res) => res.json());

const useVatsimData = (): VatsimData => {
  const { data, error } = useSWR('/api/vatsim-data', FETCHER, {
    refreshInterval: 15000,
  });

  return {
    general: data?.general,
    pilots: data?.pilots,
    controllers: data?.controllers,
    atis: data?.atis,
    servers: data?.servers,
    prefiles: data?.prefiles,
    facilities: data?.facilities,
    ratings: data?.ratings,
    pilotRatings: data?.pilot_ratings,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useVatsimData;
