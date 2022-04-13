import { createContext } from 'react';

import type { DraggingItemContextValue } from '../types';

const DraggingItemContext = createContext<DraggingItemContextValue>(undefined);

export default DraggingItemContext;
