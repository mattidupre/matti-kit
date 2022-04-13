import { insertIndex, removeIndex, moveIndex } from './transformIndexes';

let mockArr: Array<any>;

beforeEach(() => {
  mockArr = [0, 1, 2, 3, 4];
});

const validInsertValues = [
  [0, [-1, 0, 1, 2, 3, 4]],
  [3, [0, 1, 2, -1, 3, 4]],
  [4, [0, 1, 2, 3, -1, 4]],
  [5, [0, 1, 2, 3, 4, -1]],
];

const invalidInsertValues = [[-1], [6]];

const validRemoveValues = [[2, [0, 1, 3, 4]]];

const invalidRemoveValues = [[-1], [5]];

const validMoveValues = [
  [3, 3, [0, 1, 2, 3, 4]],
  [4, 0, [4, 0, 1, 2, 3]],
  [2, 4, [0, 1, 3, 4, 2]],
  [0, 0, [0, 1, 2, 3, 4]],
  [0, 1, [1, 0, 2, 3, 4]],
  [0, 4, [1, 2, 3, 4, 0]],
  [4, 2, [0, 1, 4, 2, 3]],
];

const invalidMoveValues = [
  [-1, 4],
  [-1, 6],
  [0, 5],
];

describe('insertIndex', () => {
  describe.each(validInsertValues)(
    'before %i',
    (toIndex: number, expectedResult: ReturnType<typeof insertIndex>) => {
      it('returns a valid array', () => {
        expect(insertIndex(mockArr, toIndex)).toEqual(expectedResult);
      });
    },
  );
  describe.each(invalidInsertValues)('before %i', (toIndex: number) => {
    it('throws an error', () => {
      expect(() => insertIndex(mockArr, toIndex)).toThrow();
    });
  });
});

describe('removeIndex', () => {
  describe.each(validRemoveValues)(
    'from %i',
    (fromIndex: number, expectedResult: ReturnType<typeof removeIndex>) => {
      it('returns a valid array', () => {
        expect(removeIndex(mockArr, fromIndex)).toEqual(expectedResult);
      });
    },
  );
  describe.each(invalidRemoveValues)('from %i', (fromIndex: number) => {
    it('throws an error', () => {
      expect(() => removeIndex(mockArr, fromIndex)).toThrow();
    });
  });
});

describe('moveIndex', () => {
  describe.each(validMoveValues)(
    'from %i to %i',
    (
      fromIndex: number,
      toIndex: number,
      expectedResult: ReturnType<typeof moveIndex>,
    ) => {
      it('returns a valid array', () => {
        expect(moveIndex(mockArr, fromIndex, toIndex)).toEqual(expectedResult);
      });
    },
  );
  describe.each(invalidMoveValues)(
    'from %i to %i',
    (fromIndex: number, toIndex: number) => {
      it('throws an error', () => {
        expect(() => moveIndex(mockArr, fromIndex, toIndex)).toThrow();
      });
    },
  );
});
