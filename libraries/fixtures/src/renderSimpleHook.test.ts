import { useEffect } from 'react';
import { act, cleanup } from '@testing-library/react-hooks';

import renderSimpleHook from './renderSimpleHook';

const onEffectSpy = jest.fn();
const onUnmountSpy = jest.fn();

const useHook = jest.fn((foo: string, bar: string) => {
  useEffect(() => {
    onEffectSpy();
    return () => onUnmountSpy();
  }, []);
  return `${foo}_${bar}_parsed`;
});

afterEach(() => {
  cleanup();
  onEffectSpy.mockClear();
  onUnmountSpy.mockClear();
});

it('calls the hook', () => {
  renderSimpleHook(useHook, 'foo', 'bar');
  expect(useHook).toHaveBeenCalledTimes(1);
  expect(useHook).toHaveBeenCalledWith('foo', 'bar');
});

it('returns a valid result', () => {
  const { result } = renderSimpleHook(useHook, 'foo', 'bar');
  expect(result.current).toBe('foo_bar_parsed');
});

it('returns an unmount function', () => {
  const { unmount } = renderSimpleHook(useHook, 'foo', 'bar');
  unmount();
  expect(onUnmountSpy).toBeCalledTimes(1);
});

it('returns a rerender function', () => {
  const { result, rerender } = renderSimpleHook(useHook, 'foo', 'bar');
  rerender('bar', 'baz');
  expect(result.current).toBe('bar_baz_parsed');
});

it('calls inside as expected', () => {
  renderSimpleHook(useHook, 'foo', 'bar');
  act(() => {
    expect(onEffectSpy).toHaveBeenCalledTimes(1);
  });
});

it('does not automatically unmount', () => {
  expect(onUnmountSpy).toBeCalledTimes(0);
});
