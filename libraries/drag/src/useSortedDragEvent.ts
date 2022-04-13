import { useInstantEffect } from '@matti-kit/utils';
import { useDragEventsContext } from './components/DragEventsProvider';

import type { SortedChangeEvent } from './components/DragEventsProvider';

const useSortedDragEvent: SortedChangeEvent = (eventName, eventOrder, fn) => {
  const dragEventsContext = useDragEventsContext();

  useInstantEffect(() => {
    if (!fn) {
      return;
    }
    dragEventsContext[eventName].attach(eventOrder, fn);
    // eslint-disable-next-line consistent-return
    return () => {
      dragEventsContext[eventName].detach(eventOrder, fn);
    };
  }, [dragEventsContext, eventName, fn]);
};

export default useSortedDragEvent;
