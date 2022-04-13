import buildTreeArrayByDepth from './buildTreeArrayByDepth';
import buildMockSimpleTree from '../fixtures/buildMockSimpleTree';
import getTreeAtLocation from '../getTreeAtLocation';

let mockTree: ReturnType<typeof buildMockSimpleTree>;
let resultArray: ReturnType<typeof buildTreeArrayByDepth>;

describe('with a simple tree', () => {
  beforeEach(() => {
    mockTree = buildMockSimpleTree();
    resultArray = buildTreeArrayByDepth(mockTree);
  });

  it('it returns an array', () => {
    expect(resultArray).toBeArray();
  });

  it('with indexes corresponding with depths', () => {
    let currentDepth = 0;
    resultArray.forEach((treesAtLevel, resultIndex) => {
      expect(resultIndex).toEqual(currentDepth);
      treesAtLevel.forEach(([, currentLocation]) => {
        expect(currentLocation.length).toEqual(currentDepth);
      });
      currentDepth += 1;
    });
  });

  it('with locations pointing to the original tree', () => {
    resultArray.forEach((treesAtLevel) =>
      treesAtLevel.forEach(([currentTree, currentLocation]) => {
        expect(currentTree).toEqual(
          getTreeAtLocation(mockTree, currentLocation),
        );
      }),
    );
  });
});
