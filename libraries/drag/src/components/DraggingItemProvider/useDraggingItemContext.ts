import { useContext } from 'react';
import DraggingItemContext from './lib/DraggingItemContext';

const useDraggingItemContext = () => useContext(DraggingItemContext);

export default useDraggingItemContext;
