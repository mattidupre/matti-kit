import { renderSimpleHook } from '../../fixtures/src';

import useIsDiff from './useIsDiff';

let isDiff: ReturnType<typeof useIsDiff>;

describe('when calling with a string', () => {
  beforeEach(() => {
    ({
      result: { current: isDiff },
    } = renderSimpleHook(useIsDiff, 'one'));
  });
  it('on first call, it returns false', () => {
    expect(isDiff()).toBe(false);
  });
  it('on second call with different value, it returns true', () => {
    expect(isDiff('two')).toBe(true);
    expect(isDiff()).toBe(true);
  });
  it('on third call with same value, it returns false', () => {
    isDiff('two');
    isDiff('two');
    expect(isDiff('two')).toBe(false);
    expect(isDiff()).toBe(false);
  });
});

describe('when calling with an object', () => {
  const objectA = {};
  const objectB = {};
  beforeEach(() => {
    ({
      result: { current: isDiff },
    } = renderSimpleHook(useIsDiff, objectA));
  });
  it('uses strict comparison', () => {
    expect(isDiff(objectA)).toBe(false);
    expect(isDiff()).toBe(false);
    expect(isDiff(objectB)).toBe(true);
    expect(isDiff()).toBe(true);
  });
});

describe('when using a custom comparison function', () => {
  const objectA = {};
  const objectB = {};
  const comparisonSpy = jest.fn(() => false);
  beforeEach(() => {
    ({
      result: { current: isDiff },
    } = renderSimpleHook(useIsDiff, objectA, comparisonSpy));
  });
  it('calls that function', () => {
    isDiff(objectB);
    expect(comparisonSpy).toHaveBeenCalledTimes(1);
    expect(comparisonSpy).toHaveBeenCalledWith(objectA, objectB);
    comparisonSpy.mockClear();
    isDiff();
    expect(comparisonSpy).toHaveBeenCalledTimes(1);
    expect(comparisonSpy).toHaveBeenCalledWith(objectA, objectB);
  });
  it('uses the return value of that function', () => {
    expect(isDiff(objectB)).toBe(false);
    expect(isDiff()).toBe(false);
  });
});
