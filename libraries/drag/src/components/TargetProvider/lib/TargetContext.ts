import { createContext } from 'react';

import type { TargetContextValue } from '../types';

const TargetContext = createContext<TargetContextValue>(undefined);

export default TargetContext;
