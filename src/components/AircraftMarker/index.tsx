import L from 'leaflet';
import { useRef } from 'react';
import { Tooltip } from 'react-leaflet';
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
  const {
    callsign,
    latitude,
    longitude,
    heading,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    flight_plan,
    altitude,
    groundspeed,
  } = data;
  const markerRef = useRef<any>(null);

  // TODO: This doesnt provide the correct coords :(.
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const [lat, lon] = calculatePositionAtDistance(
  //       latitude,
  //       longitude,
  //       heading,
  //       groundspeed,
  //       2
  //     );

  //     const marker = markerRef.current;
  //     marker?.setLatLng([lat, lon]);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      {/* // This works but unable to push to Github as npm run build-types errors.
      // @ts-ignore // eslint-disable-next-line */}
      <LeafletTrackingMarker
        icon={getAircraftIcon(flight_plan?.aircraft_short || '')}
        rotationAngle={heading}
        position={[latitude, longitude]}
        previousPosition={[latitude, longitude]}
        duration={1}
        ref={markerRef}
      >
        <Tooltip direction="auto" offset={[5, 0]} className="tooltip-custom">
          <div className="text-xs font-medium leading-3">
            <span className="block">
              {callsign} {flight_plan?.aircraft_faa}
            </span>
            <span className="block">
              {altitude} {groundspeed}
            </span>
            <span className="block">
              {flight_plan?.departure} {flight_plan?.arrival}
            </span>
          </div>
        </Tooltip>
      </LeafletTrackingMarker>
    </>
  );
};

export default AircraftMarker;
