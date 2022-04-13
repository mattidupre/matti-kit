import findUpTree from './findUpTree';
import buildMockTreeAll from './fixtures/buildMockTreeAll';
import getAllParentTrees from './getAllParentTrees';
import getTreeAtLocation from './getTreeAtLocation';

import type { MockFullTree } from './fixtures/types';

let mockFullTreeTop: MockFullTree;
let mockFullTreeBottom: MockFullTree;
let result: ReturnType<typeof findUpTree>;

const getName = (tree: any) => tree?.value.name as string | undefined;
const getNamesFromCalls = (calls: any) =>
  ((calls as unknown) as Array<[MockFullTree]>).map(([tree]) => getName(tree));
const getNamesFromTrees = (trees: Array<MockFullTree>) =>
  trees.map(({ value: { name } }) => name);

beforeEach(() => {
  ({ mockFullTreeTop, mockFullTreeBottom } = buildMockTreeAll());
});

describe('when callback always returns false', () => {
  const callbackSpy = jest.fn(() => false);

  afterEach(() => {
    callbackSpy.mockClear();
  });

  describe('calling with a top tree', () => {
    beforeEach(() => {
      result = findUpTree<MockFullTree>(mockFullTreeTop, {
        callback: callbackSpy,
      });
    });

    it('returns undefined', () => {
      expect(getName(result)).toBeUndefined();
    });

    it('gets called once', () => {
      expect(callbackSpy).toBeCalledTimes(1);
    });

    it('gets called with the provided tree', () => {
      expect(getNamesFromCalls(callbackSpy.mock.calls)).toEqual([
        getName(mockFullTreeTop),
      ]);
    });
  });

  describe('calling with a bottom tree', () => {
    beforeEach(() => {
      result = findUpTree<MockFullTree>(mockFullTreeBottom, {
        callback: callbackSpy,
      });
    });

    it('returns undefined', () => {
      expect(result).toBeUndefined();
    });

    it('gets called once for that tree and each parent', () => {
      expect(callbackSpy).toBeCalledTimes(
        mockFullTreeBottom.location.length + 1,
      );
    });

    it('gets called with each respective tree', () => {
      expect(getNamesFromCalls(callbackSpy.mock.calls)).toEqual(
        getNamesFromTrees([
          mockFullTreeBottom,
          ...getAllParentTrees(mockFullTreeBottom),
        ]),
      );
    });
  });
});

describe('when callback always returns true', () => {
  const callbackSpy = jest.fn(() => true);

  afterEach(() => {
    callbackSpy.mockClear();
  });

  describe('calling with a bottom tree', () => {
    beforeEach(() => {
      result = findUpTree<MockFullTree>(mockFullTreeBottom, {
        callback: callbackSpy,
      });
    });

    it('returns the current tree', () => {
      expect(getName(result)).toBe(getName(mockFullTreeBottom));
    });

    it('gets called once', () => {
      expect(callbackSpy).toBeCalledTimes(1);
    });

    it('gets called with the provided tree', () => {
      expect(getNamesFromCalls(callbackSpy.mock.calls)).toEqual([
        getName(mockFullTreeBottom),
      ]);
    });
  });
});

const CALL_NUMBER = 2;
describe(`when callback returns true on call no ${CALL_NUMBER}`, () => {
  let callCount = 0;
  const callbackSpy = jest.fn(() => {
    callCount += 1;
    return callCount === CALL_NUMBER;
  });

  afterEach(() => {
    callbackSpy.mockClear();
    callCount = 0;
  });

  describe('calling with a bottom tree', () => {
    beforeEach(() => {
      result = findUpTree<MockFullTree>(mockFullTreeBottom, {
        callback: callbackSpy,
      });
    });

    it('returns the expected tree', () => {
      const expectedTree = getTreeAtLocation(
        mockFullTreeTop,
        mockFullTreeBottom.location.slice(0, -(CALL_NUMBER - 1)),
      );
      expect(getName(result)).toBe(getName(expectedTree));
    });

    it('gets called twice', () => {
      expect(callbackSpy).toBeCalledTimes(CALL_NUMBER);
    });

    it(`gets called with the provided tree and ${
      CALL_NUMBER - 1
    } parent tree`, () => {
      expect(getNamesFromCalls(callbackSpy.mock.calls)).toEqual(
        getNamesFromTrees([
          mockFullTreeBottom,
          ...getAllParentTrees(mockFullTreeBottom).slice(0, CALL_NUMBER - 1),
        ]),
      );
    });
  });
});
