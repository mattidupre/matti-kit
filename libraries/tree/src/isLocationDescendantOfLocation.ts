const isLocationDescendantOfLocation = (
  subjectLocation: Array<number>,
  targetLocation: Array<number>,
) =>
  targetLocation.every(
    (targetIndex, targetIndexIndex) =>
      targetIndex === subjectLocation[targetIndexIndex],
  );

export default isLocationDescendantOfLocation;
