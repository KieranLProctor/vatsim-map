import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';

import type Flight from '@/interfaces/Flight';

interface Props {
  data: Flight;
}

const ICON = L.icon({
  iconSize: [25, 25],
  // popupAnchor: [2, -20],
  iconUrl: '/assets/images/icons/aircraft/A320.png',
});

const AircraftMarker: React.FC<Props> = ({ data }) => {
  const { lat, lon, hdg } = data;
  const [prevPos, setPrevPos] = useState([lat, lon]);
  const [currentHdg, setCurrentHdg] = useState(hdg);

  useEffect(() => {
    if (prevPos[1] !== lon && prevPos[0] !== lat) {
      setPrevPos([lat, lon]);
      setCurrentHdg(hdg);
    }

    console.log(currentHdg);
  }, [data]);

  return (
    // This works but unable to push to Github as npm run build-types errors.
    // <LeafletTrackingMarker
    //   icon={ICON}
    //   rotationAngle={currentHdg}
    //   position={[lat, lon]}
    //   previousPosition={prevPos}
    //   duration={1}
    // />
    <Marker position={[lat, lon]} icon={ICON} />
  );
};

export default AircraftMarker;
