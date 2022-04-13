import { useRef, useContext } from 'react';

import type { Context } from 'react';

const useGlobalContextValue = <
  ContextValue extends any,
  Key extends keyof ContextValue
>(
  ReactContext: Context<ContextValue>,
  contextKey: Key,
  defaultConstructor: { (): ContextValue[Key] },
) => {
  const contextValue = useContext(ReactContext);
  const valueRef = useRef<ContextValue[Key]>(
    contextValue ? contextValue[contextKey] : defaultConstructor(),
  );
  return valueRef.current;
};

export default useGlobalContextValue;
