import { useInstantEffect } from '@matti-kit/utils';
import { useTargetEventsContext } from './components/TargetEventsProvider';

import type { ChangeEvent } from './components/TargetEventsProvider';

const useTargetEvent: ChangeEvent = (targetDragId, eventName, fn) => {
  const targetEventsContext = useTargetEventsContext();

  useInstantEffect(() => {
    targetEventsContext[eventName].attach(targetDragId, fn);
    return () => {
      targetEventsContext[eventName].detach(targetDragId, fn);
    };
  }, [targetEventsContext, eventName, targetDragId, fn]);
};

export default useTargetEvent;
