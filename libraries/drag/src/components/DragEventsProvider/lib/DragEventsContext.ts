import { createContext } from 'react';

import type { DragEventsContextValue } from '../types';

const DragEventsContext = createContext<DragEventsContextValue>(undefined);

export default DragEventsContext;
