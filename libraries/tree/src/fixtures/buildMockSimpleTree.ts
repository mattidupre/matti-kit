import buildMockTreeValueFn from './buildMockTreeValueFn';

import type { BuildOptions, MockSimpleTree } from './types';

const buildMockSimpleTree = (buildOptions?: BuildOptions) => {
  const mockValue = buildMockTreeValueFn(buildOptions);
  const mockSimpleTree: MockSimpleTree = {
    value: mockValue(),
    children: [
      { value: mockValue() },
      {
        value: mockValue(),
        children: [
          { value: mockValue() },
          { value: mockValue() },
          { value: mockValue() },
        ],
      },
      { value: mockValue() },
    ],
  };
  return mockSimpleTree;
};

export default buildMockSimpleTree;
