const KMH_VALUE = 1.852;

export const convertKtsToKmh = (speed: number) => {
  return Math.floor(speed * KMH_VALUE);
};

export const convertKmhToKts = (speed: number) => {
  return Math.floor(speed / KMH_VALUE);
};
