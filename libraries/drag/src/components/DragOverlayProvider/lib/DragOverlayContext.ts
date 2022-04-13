import { createContext } from 'react';

import type { DragOverlayContextValue } from '../types';

const DragOverlayContext = createContext<DragOverlayContextValue>(undefined);

export default DragOverlayContext;
