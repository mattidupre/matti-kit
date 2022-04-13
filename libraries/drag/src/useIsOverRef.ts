import { useMemo } from 'react';
import { useTargetContext } from './components/TargetProvider';

import { DragId } from '~/types';

const useIsOverRef = (targetDragId: DragId) => {
  const { getTargetIsOverRef } = useTargetContext();
  return useMemo(
    () => getTargetIsOverRef(targetDragId),
    [getTargetIsOverRef, targetDragId],
  );
};

export default useIsOverRef;
