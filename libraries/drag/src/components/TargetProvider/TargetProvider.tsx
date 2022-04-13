import React, { createRef, useCallback, useMemo, useRef } from 'react';
import { useLazyRef } from '@matti-kit/utils';
import TargetContext from './lib/TargetContext';

import type { DragId } from '~/types';
import type { TargetValue, TargetContextValue } from './types';

type Props = { children: React.ReactNode };

const TargetProvider: React.FC<Props> = ({ children }) => {
  const currentTargetRef: TargetContextValue['currentTargetRef'] = useRef(null);
  const targetIsOverMapRef = useLazyRef<
    Map<DragId, React.MutableRefObject<boolean>>
  >(() => new Map());

  const getOrSetTargetIsOverRef = useCallback(
    (targetDragId: DragId) => {
      const { current: targetIsOverMap } = targetIsOverMapRef;
      const { current: currentTargetDragId } = currentTargetRef;

      let targetIsOverRef: React.MutableRefObject<boolean>;

      if (!targetIsOverMap.has(targetDragId)) {
        targetIsOverRef = createRef();
        targetIsOverRef.current = targetDragId === currentTargetDragId;
        targetIsOverMap.set(targetDragId, targetIsOverRef);
      } else {
        targetIsOverRef = targetIsOverMap.get(targetDragId);
      }

      return targetIsOverRef;
    },
    [targetIsOverMapRef],
  );

  const updateCurrentTarget = useCallback<
    TargetContextValue['updateCurrentTarget']
  >(
    (newTargetDragId) => {
      (currentTargetRef as React.MutableRefObject<TargetValue>).current =
        newTargetDragId;

      const { current: targetIsOverMap } = targetIsOverMapRef;

      targetIsOverMap.forEach((thisTargetIsOverRef, thisTargetDragId) => {
        // eslint-disable-next-line no-param-reassign
        thisTargetIsOverRef.current = thisTargetDragId === newTargetDragId;
      });

      if (!targetIsOverMap.has(newTargetDragId)) {
        getOrSetTargetIsOverRef(newTargetDragId);
      }
    },
    [getOrSetTargetIsOverRef, targetIsOverMapRef],
  );

  const targetContextValue = useMemo<TargetContextValue>(
    () => ({
      currentTargetRef,
      updateCurrentTarget,
      getTargetIsOverRef: getOrSetTargetIsOverRef,
    }),
    [getOrSetTargetIsOverRef, updateCurrentTarget],
  );

  return (
    <TargetContext.Provider value={targetContextValue}>
      {children}
    </TargetContext.Provider>
  );
};
export default TargetProvider;
