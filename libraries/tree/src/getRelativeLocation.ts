import isLocationDescendantOfLocation from './isLocationDescendantOfLocation';

const getRelativeLocation = (
  baseLocation: Array<number>,
  childLocation: Array<number>,
) => {
  if (!isLocationDescendantOfLocation(childLocation, baseLocation)) {
    throw new Error('Child location is not a subset of base location.');
  }
  return childLocation.slice(baseLocation.length);
};

export default getRelativeLocation;
