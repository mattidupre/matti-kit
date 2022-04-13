import { useContext } from 'react';
import TargetContext from './lib/TargetContext';

const useTargetContext = () => useContext(TargetContext);

export default useTargetContext;
