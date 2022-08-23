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
  // let position: number[] = [latitude, longitude];
  const markerRef = useRef<any>(null);

  // TODO: This is causing the aircraft to have incorrect poisitions - think it is doesnt update correctly when the data from the api is refreshed.
  // Interpolate aircraft position.
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const intervalTime = 2;
  //     const EARTH_RADIANS = 6378.1;

  //     const headingRad = (Math.PI * heading) / 180;
  //     const distance = ((1.852 * groundspeed) / 3600) * intervalTime;

  //     // (position[x] || 0) is a fallback to fix typescript errors.
  //     const lat1 = (Math.PI * (position[0] || 0)) / 180;
  //     const lon1 = (Math.PI * (position[1] || 0)) / 180;

  //     const lat2 =
  //       (180 *
  //         Math.asin(
  //           Math.sin(lat1) * Math.cos(distance / EARTH_RADIANS) +
  //             Math.cos(lat1) *
  //               Math.sin(distance / EARTH_RADIANS) *
  //               Math.cos(headingRad)
  //         )) /
  //       Math.PI;
  //     const lon2 =
  //       (180 *
  //         (lon1 +
  //           Math.atan2(
  //             Math.sin(headingRad) *
  //               Math.sin(distance / EARTH_RADIANS) *
  //               Math.cos(lat1),
  //             Math.cos(distance / EARTH_RADIANS) -
  //               Math.sin(lat1) * Math.sin(lat2)
  //           ))) /
  //       Math.PI;

  //     position = [lat2, lon2];

  //     const marker = markerRef.current;
  //     marker?.setLatLng(position);
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
