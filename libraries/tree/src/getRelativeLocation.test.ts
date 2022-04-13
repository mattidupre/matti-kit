import getRelativeLocation from './getRelativeLocation';

describe('given a location that IS subset of the other', () => {
  it('returns the relative location', () => {
    expect(getRelativeLocation([1, 2], [1, 2, 3, 4])).toEqual([3, 4]);
  });
});

describe('given a location that IS a subset of an empty location', () => {
  it('returns the original location', () => {
    expect(getRelativeLocation([], [1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe('given two empty locations', () => {
  it('returns an empty location', () => {
    expect(getRelativeLocation([], [])).toEqual([]);
  });
});

describe('given two equal locations', () => {
  it('returns the relative location', () => {
    expect(getRelativeLocation([1, 2, 3], [1, 2, 3])).toEqual([]);
  });
});

describe('given one location that IS NOT a subset of the other', () => {
  it('throws', () => {
    expect(() => getRelativeLocation([1, 2, 3], [2, 3])).toThrow();
  });
});
