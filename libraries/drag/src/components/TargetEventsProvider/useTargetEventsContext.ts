import { useContext } from 'react';
import TargetEventsContext from './lib/TargetEventsContext';

const useTargetEventsContext = () => useContext(TargetEventsContext);

export default useTargetEventsContext;
