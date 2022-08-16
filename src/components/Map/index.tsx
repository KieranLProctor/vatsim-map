import 'leaflet/dist/leaflet.css';

import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useAsync } from 'react-use';

import { getAllLiveFlights } from '@/utils/Endpoints';

interface Props {}

const Map: React.FC<Props> = () => {
  const flights = useAsync(getAllLiveFlights);

  // useEffect(() => {
  //   if (flights.loading === true) return;

  //   // console.log(flights.value);
  // }, [flights]);

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[100vh - 186px] tablet:h-[100vh - 76px]"
      >
        {flights.loading === false
          ? flights.value.map((flight: any) => (
              <Marker key={flight.cid} position={[flight.lat, flight.lon]} />
            ))
          : null}

        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};

export default Map;
