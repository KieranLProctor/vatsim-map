import L from 'leaflet';
import { Tooltip } from 'react-leaflet';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker';

import type Pilot from '@/interfaces/Pilot';

interface Props {
  data: Pilot;
  // children?: React.ReactNode;
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
    iconSize: [25, 25],
    iconUrl: `/assets/images/icons/aircraft/${
      availableTypes.includes(aircraftType) ? aircraftType : 'A320'
    }.png`,
  });

  return icon;
};

const AircraftMarker: React.FC<Props> = ({ data }) => {
  // This is disabled as it is data coming from an api so we want to keep the same names.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { latitude, longitude, heading, flight_plan } = data;

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
      />
      <Tooltip direction="right" offset={[0, 20]} opacity={1} permanent>
        permanent Tooltip for Rectangle
      </Tooltip>
    </>
  );
};

export default AircraftMarker;
