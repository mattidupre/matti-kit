import { useInstantEffect } from '@matti-kit/utils';
import { useDragEventsContext } from './components/DragEventsProvider';

import type { ChangeEvent } from './components/DragEventsProvider';

const useDragEvent: ChangeEvent = (eventName, fn) => {
  const dragEventsContext = useDragEventsContext();

  useInstantEffect(() => {
    if (!fn) {
      return;
    }
    dragEventsContext[eventName].attach(null, fn);
    // eslint-disable-next-line consistent-return
    return () => {
      dragEventsContext[eventName].detach(null, fn);
    };
  }, [dragEventsContext, eventName, fn]);
};

export default useDragEvent;
