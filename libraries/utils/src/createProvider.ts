import { createContext, useContext } from 'react';

const createProvider = <ProviderContextValue extends any>() => {
  const Context = createContext<ProviderContextValue>(undefined);
  const useContextValue = () => useContext(Context);
  return [Context.Provider, useContextValue, Context] as const;
};

export default createProvider;
