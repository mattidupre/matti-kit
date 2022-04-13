import { renderHook } from '@testing-library/react-hooks/pure';

const renderSimpleHook = <
  Args extends Array<unknown>,
  ReturnValue extends unknown
>(
  useHook: {
    (...args: Args): ReturnValue;
  },
  ...initialArgs: Args
) => {
  const { result, rerender, unmount } = renderHook<{ args: Args }, ReturnValue>(
    ({ args: theseArgs }) => useHook(...theseArgs),
    {
      initialProps: { args: initialArgs },
    },
  );
  const wrappedRerender = (...newArgs: Args) => rerender({ args: newArgs });

  return { result, rerender: wrappedRerender, unmount };
};

export default renderSimpleHook;
