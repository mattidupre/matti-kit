import { useContext } from 'react';
import DragEventsContext from './lib/DragEventsContext';

const useDragEventsContext = () => useContext(DragEventsContext);

export default useDragEventsContext;
