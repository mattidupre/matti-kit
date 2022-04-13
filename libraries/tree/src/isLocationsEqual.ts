const isLocationsEqual = (
  locationA: Array<number>,
  locationB: Array<number>,
) => {
  if (locationA.length !== locationB.length) {
    return false;
  }
  return locationA.every((_, i) => locationA[i] === locationB[i]);
};

export default isLocationsEqual;
