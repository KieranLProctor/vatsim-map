const KMH_VALUE = 1.852;
const METER_VALUE = 0.3048;

export const convertKtsToKmh = (kts: number) => {
  return Math.floor(kts * KMH_VALUE);
};

export const convertKmhToKts = (kmh: number) => {
  return Math.floor(kmh / KMH_VALUE);
};

export const convertFeetToMeter = (feet: number) => {
  return Math.floor(feet * METER_VALUE);
};

export const convertMeterToFeet = (meter: number) => {
  return Math.floor(meter / METER_VALUE);
};
