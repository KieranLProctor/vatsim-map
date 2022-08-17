export default interface Flight {
  cid: number;
  callsign: string;
  dep: string;
  arr: string;
  lat: number;
  lon: number;
  alt: number;
  crzalt: string;
  aircraft: string;
  route: string;
  gndspd: number;
  hdg: number;
  uid: string;
  name: string;
  rating: number;
  departed_at?: string;
  arrived_at?: string;
}
