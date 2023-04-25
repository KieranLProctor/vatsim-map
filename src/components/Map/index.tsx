import 'leaflet/dist/leaflet.css';

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import AircraftMarker from '@/components/AircraftMarker';
import type Pilot from '@/interfaces/Pilot';

interface Props {
  pilots: Pilot[];
}

const Map: React.FC<Props> = ({ pilots }) => {
  // const config = useContext<Config | null>(ConfigContext);

  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {pilots.length > 0
          ? pilots
              .slice(2, 3)
              .map((pilot: Pilot) => (
                <AircraftMarker
                  key={`${pilot.callsign}_${pilot.cid}`}
                  data={pilot}
                />
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
