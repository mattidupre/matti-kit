import { useTargetContext } from './components/TargetProvider';

const useTargetRef = () => {
  const { currentTargetRef } = useTargetContext();
  return currentTargetRef;
};

export default useTargetRef;
