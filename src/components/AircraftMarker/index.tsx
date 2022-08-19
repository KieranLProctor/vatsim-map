import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker';

import type Pilot from '@/interfaces/Pilot';

interface Props {
  data: Pilot;
}

const getAircraftIcon = (aircraftType: string) => {
  const availableTypes = [
    'A320',
    'A340',
    'B738',
    'B739',
    'B744',
    'B752',
    'B777',
    'CRJ9',
  ];

  const icon = L.icon({
    iconSize: [18, 18],
    iconUrl: `/assets/images/icons/aircraft/${
      availableTypes.includes(aircraftType) ? aircraftType : 'A320'
    }.png`,
  });

  return icon;
};

const AircraftMarker: React.FC<Props> = ({ data }) => {
  // This is disabled as it is data coming from an api so we want to keep the same names.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { latitude, longitude, heading, groundspeed, flight_plan } = data;
  let position: number[] = [latitude, longitude];
  const markerRef = useRef<any>(null);

  // Interpolate aircraft position.
  useEffect(() => {
    const interval = setInterval(() => {
      const intervalTime = 2;
      const EARTH_RADIANS = 6378.1;

      const headingRad = (Math.PI * heading) / 180;
      const distance = ((1.852 * groundspeed) / 3600) * intervalTime;

      // (position[x] || 0) is a fallback to fix typescript errors.
      const lat1 = (Math.PI * (position[0] || 0)) / 180;
      const lon1 = (Math.PI * (position[1] || 0)) / 180;

      const lat2 =
        (180 *
          Math.asin(
            Math.sin(lat1) * Math.cos(distance / EARTH_RADIANS) +
              Math.cos(lat1) *
                Math.sin(distance / EARTH_RADIANS) *
                Math.cos(headingRad)
          )) /
        Math.PI;
      const lon2 =
        (180 *
          (lon1 +
            Math.atan2(
              Math.sin(headingRad) *
                Math.sin(distance / EARTH_RADIANS) *
                Math.cos(lat1),
              Math.cos(distance / EARTH_RADIANS) -
                Math.sin(lat1) * Math.sin(lat2)
            ))) /
        Math.PI;

      position = [lat2, lon2];

      const marker = markerRef.current;
      marker?.setLatLng(position);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* // This works but unable to push to Github as npm run build-types errors.
      // @ts-ignore // eslint-disable-next-line */}
      <LeafletTrackingMarker
        icon={getAircraftIcon(flight_plan?.aircraft_short || '')}
        rotationAngle={heading}
        position={position}
        previousPosition={position}
        duration={1}
        ref={markerRef}
      />
    </>
  );
};

export default AircraftMarker;
