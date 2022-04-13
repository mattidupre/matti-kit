import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { DragOverlay } from '@dnd-kit/core';

import useDragOverlayContext from '../useDragOverlayContext';
import useDragEvent from '~/useDragEvent';
import getPayloadFromEvent from '~/getPayloadFromEvent';

import type { DragId } from '~/types';

type Props = {};

const DragOverlayContainer: React.VFC<Props> = () => {
  const [contentState, setContentState] = useState<React.ReactElement>(null);
  const { factoriesByUid, factoriesWithMatchers, defaultFactory } =
    useDragOverlayContext();

  const setContent = useCallback(
    (event) => {
      const activeId = event.active?.id as DragId;
      const payload = getPayloadFromEvent(event);

      // Factories by UID have priority.
      if (factoriesByUid.has(activeId)) {
        setContentState(factoriesByUid.get(activeId)(payload));
        return;
      }

      // Iterate over matchers.
      let resultFactory;
      factoriesWithMatchers.forEach(([matcher, factory]) => {
        if (!resultFactory && matcher(payload)) {
          resultFactory = factory;
        }
      });
      if (resultFactory) {
        setContentState(resultFactory(payload));
        return;
      }

      // Use the default factory as a fallback.
      setContentState(defaultFactory(payload));
    },
    [factoriesByUid, factoriesWithMatchers, defaultFactory],
  );

  const clearContent = useCallback(() => {
    setContentState(null);
  }, []);

  useDragEvent('start', setContent);
  useDragEvent('end', clearContent);
  useDragEvent('cancel', clearContent);

  return createPortal(<DragOverlay>{contentState}</DragOverlay>, document.body);
};

export default DragOverlayContainer;
