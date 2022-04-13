import compareArrays from './compareArrays';

const obj1 = {};
const obj2 = {};

const equalArrays = [
  [
    ['one', 'two', 'three'],
    ['one', 'two', 'three'],
  ],
  [['one'], ['one']],
  [[''], ['']],
  [[null], [null]],
  [[obj1], [obj1]],
  [[undefined], [undefined]],
];

const unequalArrays = [
  [
    ['one', 'two', 'three'],
    ['one', 'two', 'four'],
  ],
  [
    ['one', 'two', 'three'],
    ['one', 'two'],
  ],
  [
    ['one', 'two', undefined],
    ['one', 'two'],
  ],
  [
    ['one', 'two'],
    ['one', 'two', 'three'],
  ],
  [['one'], ['']],
  [[''], ['one']],
  [[obj1], [obj2]],
  [[null], [undefined]],
];

describe.each(equalArrays)('comparing %s with %s', (arr1, arr2) => {
  it('returns true', () => {
    expect(compareArrays(arr1, arr2)).toBe(true);
  });
});

describe.each(unequalArrays)('comparing %s with %s', (arr1, arr2) => {
  it('returns false', () => {
    expect(compareArrays(arr1, arr2)).toBe(false);
  });
});
