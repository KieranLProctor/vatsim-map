const EARTH_RADIANS = 6371;

export const calculatePositionAtDistance = (
  lat: number,
  lon: number,
  heading: number,
  speed: number,
  interval: number
) => {
  // Convert to radians.
  const latRad = (Math.PI * lat) / 180;
  const lonRad = (Math.PI * lon) / 180;
  const headingRad = (Math.PI * heading) / 180;

  const distanceKm = ((1.852 * speed) / 3600) * interval;

  const lat2 = Math.asin(
    Math.sin(latRad) * Math.cos(distanceKm / EARTH_RADIANS) +
      Math.cos(latRad) *
        Math.sin(distanceKm / EARTH_RADIANS) *
        Math.cos(headingRad)
  );

  const lon2 =
    lonRad +
    Math.atan2(
      Math.sin(headingRad) *
        Math.sin(distanceKm / EARTH_RADIANS) *
        Math.cos(latRad),
      Math.cos(distanceKm / EARTH_RADIANS) - Math.sin(latRad) * Math.sin(lat2)
    );

  // TODO: Cleanup the rounding funciton.
  const latRounded = Math.round(lat2 * (180 / Math.PI) * 10 ** 5) / 10 ** 5;
  const lonRounded = Math.round(lon2 * (180 / Math.PI) * 10 ** 5) / 10 ** 5;

  return [latRounded, lonRounded];
};
