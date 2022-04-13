import buildMockSimpleTree from './buildMockSimpleTree';
import loopMockTree from './loopMockTree';

import type { BuildOptions } from './types';

const buildMockFullTree = (buildOptions?: BuildOptions) =>
  loopMockTree(buildMockSimpleTree(buildOptions));

export default buildMockFullTree;
