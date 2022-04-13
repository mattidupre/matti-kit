import React from 'react';
import usePersistentMemo from './usePersistentMemo';
import createProvider from './createProvider';

const createNestedGlobalProvider = <ProviderContextValue extends any>() => {
  const [ContextProvider, useContextValue, Context] = createProvider<
    ProviderContextValue
  >();

  const Provider: React.FC<{
    initializeValue;
  }> = ({ children, initializeValue }) => {
    const parentContextValue = useContextValue();

    const contextValue = usePersistentMemo<ProviderContextValue>(() => {
      if (parentContextValue !== undefined) {
        return parentContextValue;
      }
      return initializeValue();
    }, [parentContextValue, initializeValue]);

    return React.createElement(
      ContextProvider,
      { value: contextValue },
      children,
    );
  };

  return [Provider, useContextValue, Context] as const;
};

export default createNestedGlobalProvider;
