import { useContext } from 'react';
import DragOverlayContext from './lib/DragOverlayContext';

const useDragOverlayContext = () => useContext(DragOverlayContext);

export default useDragOverlayContext;
