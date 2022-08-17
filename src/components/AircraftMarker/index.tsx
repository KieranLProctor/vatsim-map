import 'leaflet/dist/leaflet.css';

import { icon } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';

import type Flight from '@/interfaces/Flight';

interface Props {
  flight: Flight;
}

const AircraftMarker: React.FC<Props> = ({ flight }) => {
  // const updateMarker = (marker) => {
  //   if (marker) {
  //     if (flight.hdg) {
  //       marker.leafletElement.setRotationAngle(flight.hdg);
  //       marker.leafletElement.setRotationOrigin('center');
  //     }

  //     console.log(marker);
  //   }
  // };

  return (
    <Marker
      // ref={(el) => updateMarker(el)}
      icon={icon({
        iconUrl: '/assets/images/icons/aircraft/A320.png',
        iconSize: [24, 24],
      })}
      position={[flight.lat, flight.lon]}
    />
  );
};

export default AircraftMarker;
