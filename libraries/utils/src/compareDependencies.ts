import { isArray } from 'lodash';

const compareDependencies = (prevDeps?: Array<any>, nextDeps?: Array<any>) => {
  if (prevDeps === undefined && nextDeps === undefined) {
    return true;
  }

  if (prevDeps === undefined || nextDeps === undefined) {
    return false;
  }

  if (!isArray(prevDeps) || !isArray(nextDeps)) {
    throw new Error('Dependencies must be arrays');
  }

  for (let i = 0; i < prevDeps.length || i < nextDeps.length; i += 1) {
    if (!Object.is(nextDeps[i], prevDeps[i])) {
      return false;
    }
  }

  return true;
};

export default compareDependencies;
