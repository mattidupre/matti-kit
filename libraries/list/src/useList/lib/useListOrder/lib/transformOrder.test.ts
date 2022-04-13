import { insertItem, deleteItem, moveItem } from './transformOrder';

import type { Order } from '../../../types';

const transforms = { insertItem, deleteItem, moveItem };

type RemoveFirstFromTuple<T extends any[]> = T['length'] extends 0
  ? undefined
  : ((...b: T) => void) extends (a, ...b: infer I) => void
  ? I
  : [];

type FullItem = Order['items'][number];
type RestArgs<T extends keyof typeof transforms> = RemoveFirstFromTuple<
  Parameters<typeof transforms[T]>
>;

const createItem = (id: string) =>
  ({
    dragId: id,
    action: null,
  } as Omit<FullItem, 'prevIndex' | 'newIndex'>);

const execute = <T extends keyof typeof transforms>(
  fnStr: T,
  configs: Array<
    [
      RestArgs<T>,
      Array<
        [
          string,
          FullItem['prevIndex'],
          FullItem['newIndex'],
          FullItem['action'],
        ]
      >,
    ]
  >,
) => {
  const fn = transforms[fnStr];
  describe(fnStr, () => {
    configs.forEach((config) => {
      const [fnArgs, resultConfig] = config;
      const allIds = resultConfig.map(([id]) => id).sort();
      const inputIds = resultConfig
        .filter(([, , , action]) => action !== 'INSERT')
        .map(([id]) => id)
        .sort();
      // @ts-ignore
      const actualResults = fn(inputIds.map(createItem), ...fnArgs);
      const expectedResults = {
        items: resultConfig.map(([dragId, prevIndex, newIndex, action]) => ({
          dragId: dragId as FullItem['dragId'],
          prevIndex,
          newIndex,
          action,
        })),
        prevIndexes: resultConfig
          .filter(([, , , action]) => action !== 'DELETE')
          .map(([, prevIndex]) => prevIndex),
        newIndexes: resultConfig
          .filter(([, , , action]) => action !== 'INSERT')
          .sort(([dragIdA], [dragIdB]) => dragIdA.localeCompare(dragIdB))
          .map(([, , newIndex]) => newIndex),
      };
      const fnArgsStr = fnArgs
        .map((arg) => (typeof arg === 'number' ? arg : arg.dragId))
        .join(', ');
      describe(`given [${allIds.join(', ')}]`, () => {
        describe(`calling with (items, ${fnArgsStr})`, () => {
          it('returns a valid order', () => {
            expect(actualResults).toEqual(expectedResults);
          });
        });
      });
    });
  });
};

execute('insertItem', [
  [[0, createItem('Z')], [['Z', -1, 0, 'INSERT']]],
  [
    [0, createItem('Z')],
    [
      ['Z', -1, 0, 'INSERT'],
      ['A', 0, 1, null],
      ['B', 1, 2, null],
      ['C', 2, 3, null],
      ['D', 3, 4, null],
    ],
  ],
  [
    [2, createItem('Z')],
    [
      ['A', 0, 0, null],
      ['B', 1, 1, null],
      ['Z', -1, 2, 'INSERT'],
      ['C', 2, 3, null],
      ['D', 3, 4, null],
    ],
  ],
  [
    [4, createItem('Z')],
    [
      ['A', 0, 0, null],
      ['B', 1, 1, null],
      ['C', 2, 2, null],
      ['D', 3, 3, null],
      ['Z', -1, 4, 'INSERT'],
    ],
  ],
]);

execute('deleteItem', [
  [
    [0],
    [
      ['A', 0, -1, 'DELETE'],
      ['B', 1, 0, null],
      ['C', 2, 1, null],
      ['D', 3, 2, null],
    ],
  ],
  [
    [2],
    [
      ['A', 0, 0, null],
      ['B', 1, 1, null],
      ['C', 2, -1, 'DELETE'],
      ['D', 3, 2, null],
    ],
  ],
  [
    [3],
    [
      ['A', 0, 0, null],
      ['B', 1, 1, null],
      ['C', 2, 2, null],
      ['D', 3, -1, 'DELETE'],
    ],
  ],
]);

execute('moveItem', [
  [
    [2, 5],
    [
      ['A', 0, 0, null],
      ['B', 1, 1, null],
      ['D', 3, 2, null],
      ['E', 4, 3, null],
      ['F', 5, 4, null],
      ['C', 2, 5, 'REORDER'],
      ['G', 6, 6, null],
      ['H', 7, 7, null],
    ],
  ],
  [
    [5, 2],
    [
      ['A', 0, 0, null],
      ['B', 1, 1, null],
      ['F', 5, 2, 'REORDER'],
      ['C', 2, 3, null],
      ['D', 3, 4, null],
      ['E', 4, 5, null],
      ['G', 6, 6, null],
      ['H', 7, 7, null],
    ],
  ],
  [
    [5, 1],

    [
      ['A', 0, 0, null],
      ['F', 5, 1, 'REORDER'],
      ['B', 1, 2, null],
      ['C', 2, 3, null],
      ['D', 3, 4, null],
      ['E', 4, 5, null],
      ['G', 6, 6, null],
      ['H', 7, 7, null],
    ],
  ],
  [
    [5, 0],

    [
      ['F', 5, 0, 'REORDER'],
      ['A', 0, 1, null],
      ['B', 1, 2, null],
      ['C', 2, 3, null],
      ['D', 3, 4, null],
      ['E', 4, 5, null],
      ['G', 6, 6, null],
      ['H', 7, 7, null],
    ],
  ],
  [
    [5, 7],

    [
      ['A', 0, 0, null],
      ['B', 1, 1, null],
      ['C', 2, 2, null],
      ['D', 3, 3, null],
      ['E', 4, 4, null],
      ['G', 6, 5, null],
      ['H', 7, 6, null],
      ['F', 5, 7, 'REORDER'],
    ],
  ],
  [
    [0, 7],

    [
      ['B', 1, 0, null],
      ['C', 2, 1, null],
      ['D', 3, 2, null],
      ['E', 4, 3, null],
      ['F', 5, 4, null],
      ['G', 6, 5, null],
      ['H', 7, 6, null],
      ['A', 0, 7, 'REORDER'],
    ],
  ],
  [
    [7, 0],

    [
      ['H', 7, 0, 'REORDER'],
      ['A', 0, 1, null],
      ['B', 1, 2, null],
      ['C', 2, 3, null],
      ['D', 3, 4, null],
      ['E', 4, 5, null],
      ['F', 5, 6, null],
      ['G', 6, 7, null],
    ],
  ],
  [
    [3, 4],

    [
      ['A', 0, 0, null],
      ['B', 1, 1, null],
      ['C', 2, 2, null],
      ['E', 4, 3, null],
      ['D', 3, 4, 'REORDER'],
      ['F', 5, 5, null],
      ['G', 6, 6, null],
      ['H', 7, 7, null],
    ],
  ],
]);

const mockIds = ['A', 'B', 'C', 'D'];
describe(`errors given ${mockIds.join(' ')}`, () => {
  describe('insertItem', () => {
    describe('calling with -1', () => {
      it('throws', () => {
        expect(() =>
          insertItem(mockIds.map(createItem), -1, createItem('Z')),
        ).toThrow();
      });
    });

    describe('calling with 5', () => {
      it('throws', () => {
        expect(() =>
          insertItem(mockIds.map(createItem), 5, createItem('Z')),
        ).toThrow();
      });
    });
  });

  describe('deleteItem', () => {
    describe('calling with -1', () => {
      it('throws', () => {
        expect(() => deleteItem(mockIds.map(createItem), -1)).toThrow();
      });
    });

    describe('calling with 4', () => {
      it('throws', () => {
        expect(() => deleteItem(mockIds.map(createItem), 4)).toThrow();
      });
    });
  });

  describe('moveItem', () => {
    describe('calling with 3, 3', () => {
      it('throws', () => {
        expect(() => moveItem(mockIds.map(createItem), 3, 3)).toThrow();
      });
    });
    describe('calling with -1, 2', () => {
      it('throws', () => {
        expect(() => moveItem(mockIds.map(createItem), -1, 2)).toThrow();
      });
    });

    describe('calling with 2, 4', () => {
      it('throws', () => {
        expect(() => moveItem(mockIds.map(createItem), 2, 4)).toThrow();
      });
    });

    describe('calling with -1, 4', () => {
      it('throws', () => {
        expect(() => moveItem(mockIds.map(createItem), -1, 4)).toThrow();
      });
    });
  });
});
