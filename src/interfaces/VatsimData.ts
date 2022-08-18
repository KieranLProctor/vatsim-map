import type ATIS from './ATIS';
import type Controller from './Controller';
import type Facility from './Facility';
import type General from './General';
import type Pilot from './Pilot';
import type PilotRating from './PilotRating';
import type Prefile from './Prefile';
import type Rating from './Rating';
import type Server from './Server';

export default interface VatsimData {
  general: General;
  pilots: Pilot[];
  controllers: Controller[];
  atis: ATIS[];
  servers: Server[];
  prefiles: Prefile[];
  facilities: Facility[];
  ratings: Rating[];
  pilotRatings: PilotRating[];
  isLoading?: boolean;
  isError?: boolean;
}
