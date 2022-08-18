import type FlightPlan from './FlightPlan';

export default interface Pilot {
  cid: number;
  name: string;
  callsign: string;
  server: string;
  pilot_rating: number;
  latitude: number;
  longitude: number;
  altitude: number;
  groundspeed: number;
  transponder: string;
  heading: number;
  qnh_i_hg: number;
  qnh_mb: number;
  flight_plan?: FlightPlan;
  logon_time: string;
  last_updated: string;
}
