import { renderSimpleHook } from '@matti-kit/fixtures';

import useDiff from './useDiff';

describe('when calling with a string', () => {
  it('on first call, it returns false', () => {
    const { result } = renderSimpleHook(useDiff, 'one');
    expect(result.current).toBe(false);
  });
  it('on second call with different value, it returns true', () => {
    const { result, rerender } = renderSimpleHook(useDiff, 'one');
    rerender('two');
    expect(result.current).toBe(true);
  });
  it('on third call with same value, it returns false', () => {
    const { result, rerender } = renderSimpleHook(useDiff, 'one');
    rerender('two');
    rerender('two');
    expect(result.current).toBe(false);
  });
});

describe('when calling with an object', () => {
  it('uses strict comparison', () => {
    const objectA = {};
    const objectB = {};
    const { result, rerender } = renderSimpleHook(useDiff, objectA);
    rerender(objectB);
    expect(result.current).toBe(true);
    rerender(objectB);
    expect(result.current).toBe(false);
  });
});

describe('when using a custom comparison function', () => {
  const objectA = {};
  const objectB = {};
  let result;
  const comparisonSpy = jest.fn(() => false);
  beforeEach(() => {
    const { result: thisResult, rerender } = renderSimpleHook(
      useDiff,
      objectA,
      comparisonSpy,
    );
    rerender(objectB, comparisonSpy);
    result = thisResult.current;
  });
  afterEach(() => {
    comparisonSpy.mockClear();
  });
  it('calls that function', () => {
    expect(comparisonSpy).toHaveBeenCalledTimes(1);
    expect(comparisonSpy).toHaveBeenCalledWith(objectA, objectB);
  });
  it('uses the return value of that function', () => {
    expect(result).toBe(false);
  });
});
