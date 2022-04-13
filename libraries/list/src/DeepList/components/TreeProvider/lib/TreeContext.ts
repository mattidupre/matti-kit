import { createContext } from 'react';

import type { TreeContextValue } from '../types';

const TreeContext = createContext<TreeContextValue>(
  (undefined as unknown) as TreeContextValue,
);

export default TreeContext;
