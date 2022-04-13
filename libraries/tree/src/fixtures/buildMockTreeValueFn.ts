/* eslint-disable no-redeclare */
import Chance from 'chance';

import type { BuildOptions, MockTreeValue } from './types';

const buildMockTreeValueFn = ({
  seed = '',
  prefix = '',
}: BuildOptions = {}) => {
  const chance = new Chance(seed);
  return (): MockTreeValue => ({
    name: (prefix ? `${prefix} ${chance.name()}` : chance.name()) as string,
  });
};

export default buildMockTreeValueFn;
