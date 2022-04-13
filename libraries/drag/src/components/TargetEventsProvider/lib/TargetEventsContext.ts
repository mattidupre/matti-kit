import { createContext } from 'react';

import type { TargetEventsContextValue } from '../types';

const TargetEventsContext = createContext<TargetEventsContextValue>(undefined);

export default TargetEventsContext;
