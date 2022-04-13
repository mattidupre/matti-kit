import { useTargetContext } from './components/TargetProvider';

import { DragId } from '~/types';

const useIsOver = (targetDragId: DragId) => {
  const { currentTargetRef } = useTargetContext();
  return targetDragId === currentTargetRef.current;
};

export default useIsOver;
