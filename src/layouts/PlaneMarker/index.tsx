import 'leaflet/dist/leaflet.css';

import { icon } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';

import type Flight from '@/components/interfaces/Flight';

interface Props {
  flight: Flight;
}

const PlaneMarker: React.FC<Props> = ({ flight }) => {
  // const updateMarker = (marker) => {
  //   if (marker) {
  //     if (flight.hdg) {
  //       marker.leafletElement.setRotationAngle(flight.hdg);
  //       marker.leafletElement.setRotationOrigin('center');
  //     }

  //     console.log(marker);
  //   }
  // };

  const createPlaneMarker = () => {
    const planeIcon = icon({
      // iconUrl: `/assets/images/icons/${flight.aircraft.split('/')[0]}.png`,
      iconUrl: '/assets/images/icons/A320.png',
      iconSize: [24, 24],
    });

    return (
      <Marker
        // ref={(el) => updateMarker(el)}
        icon={planeIcon}
        position={[flight.lat, flight.lon]}
      />
    );
  };

  return <>{createPlaneMarker}</>;
};

export default PlaneMarker;
