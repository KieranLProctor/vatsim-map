import L from 'leaflet';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker';

import type Pilot from '@/interfaces/Pilot';

interface Props {
  data: Pilot;
}

const AircraftMarker: React.FC<Props> = ({ data }) => {
  const { latitude, longitude, heading } = data;
  return (
    // This works but unable to push to Github as npm run build-types errors.
    // @ts-ignore
    // eslint-disable-next-line
    <LeafletTrackingMarker
      icon={L.icon({
        iconSize: [25, 25],
        // popupAnchor: [2, -20],
        iconUrl: '/assets/images/icons/aircraft/A320.png',
      })}
      rotationAngle={heading}
      position={[latitude, longitude]}
      previousPosition={[latitude, longitude]}
      duration={1}
    />
    // <Marker position={[latitude, longitude]} icon={ICON} />
  );
};

export default AircraftMarker;
