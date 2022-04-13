import compareDependencies from './compareDependencies';

const item1 = {};
const item2 = {};
const item3 = {};

it('throws when either parameter is NOT an array', () => {
  // @ts-ignore
  expect(() => compareDependencies('', '')).toThrow();
  // @ts-ignore
  expect(() => compareDependencies('', [])).toThrow();
  // @ts-ignore
  expect(() => compareDependencies([], '')).toThrow();
  expect(() => compareDependencies(null, null)).toThrow();
  expect(() => compareDependencies(null, [])).toThrow();
  expect(() => compareDependencies([], null)).toThrow();
});

it('returns true when array items are BOTH undefined', () => {
  expect(compareDependencies()).toBe(true);
});

it('returns false when only one array is undefined', () => {
  expect(compareDependencies(undefined, [])).toBe(false);
  expect(compareDependencies([])).toBe(false);
});

it('returns true when both arrays are empty', () => {
  expect(compareDependencies([], [])).toBe(true);
});

it('returns true when array items are equal numbers', () => {
  expect(compareDependencies([1, 2, 3], [1, 2, 3])).toBe(true);
});

it('returns false when array items unequal numbers', () => {
  expect(compareDependencies([1, 2, 3], [1, 2])).toBe(false);
  expect(compareDependencies([1, 2], [1, 2, 3])).toBe(false);
});

it('returns true when array items are STRICT equal objects', () => {
  expect(
    compareDependencies([item1, item2, item3], [item1, item2, item3]),
  ).toBe(true);
});

it('returns false when array items are NON-STRICT equal objects', () => {
  expect(compareDependencies([item1, item2], [item2, item3])).toBe(false);
});

it('returns false when array items are in differing orders', () => {
  expect(compareDependencies([item1, item2], [item2, item1])).toBe(false);
});
