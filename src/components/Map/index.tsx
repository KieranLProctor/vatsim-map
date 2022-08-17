import 'leaflet/dist/leaflet.css';

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import AircraftMarker from '@/components/AircraftMarker';
import type Flight from '@/interfaces/Flight';

interface Props {
  flights: Flight[];
}

const Map: React.FC<Props> = ({ flights }) => {
  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={8}
        scrollWheelZoom={true}
        className="h-[100vh - 186px] tablet:h-[100vh - 76px]"
      >
        {flights.length > 0
          ? flights.map((flight: any) => (
              <AircraftMarker key={flight.cid} flight={flight} />
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
