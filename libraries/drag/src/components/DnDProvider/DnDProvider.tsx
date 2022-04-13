import React, { useCallback } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import getPayloadFromEvent from '~/getPayloadFromEvent';
import getDragIdFromEvent from '~/getDragIdFromEvent';
import getTargetDragIdFromEvent from '~/getTargetDragIdFromEvent';
import { useDragEventsContext } from '../DragEventsProvider';
import { useTargetEventsContext } from '../TargetEventsProvider';
import { useDraggingItemContext } from '../DraggingItemProvider';
import { useTargetContext } from '../TargetProvider';
import useCollisionDetection from './lib/useCollisionDetection';

import type {
  DragStartEvent,
  DragMoveEvent,
  DragOverEvent,
  DragEndEvent,
  DragCancelEvent,
} from '@dnd-kit/core';

import type { DragId } from '~/types';

type Props = { children: React.ReactNode };

const DnDProvider: React.FC<Props> = ({ children }) => {
  const dragEventsContext = useDragEventsContext();
  const targetEventsContext = useTargetEventsContext();
  const { updateDraggingItem } = useDraggingItemContext();
  const { currentTargetRef, updateCurrentTarget } = useTargetContext();
  const [, collisionDetection] = useCollisionDetection();

  const handleDragStart = useCallback(
    (ev: DragStartEvent) => {
      updateDraggingItem({
        dragId: getDragIdFromEvent(ev),
        payload: getPayloadFromEvent(ev),
      });
      dragEventsContext.start.triggerAll(ev);
    },
    [dragEventsContext.start, updateDraggingItem],
  );

  const handleDragMove = useCallback(
    (ev: DragMoveEvent) => {
      const newTargetDragId = getTargetDragIdFromEvent(ev);
      const { current: prevTargetDragId } = currentTargetRef;
      if (newTargetDragId !== prevTargetDragId) {
        updateCurrentTarget(newTargetDragId as DragId | null);
        if (prevTargetDragId !== null) {
          targetEventsContext.out.trigger(prevTargetDragId as DragId, ev);
        }
        if (newTargetDragId) {
          targetEventsContext.over.trigger(newTargetDragId as DragId, ev);
        }
      }

      dragEventsContext.move.triggerAll(ev);
    },
    [
      currentTargetRef,
      dragEventsContext.move,
      targetEventsContext.out,
      targetEventsContext.over,
      updateCurrentTarget,
    ],
  );

  const handleDragOver = useCallback(
    (ev: DragOverEvent) => {
      dragEventsContext.over.triggerAll(ev);
    },
    [dragEventsContext],
  );

  const handleDragEnd = useCallback(
    (ev: DragEndEvent) => {
      updateDraggingItem(null);
      const newTargetDragId = getTargetDragIdFromEvent(ev);
      if (newTargetDragId) {
        targetEventsContext.drop.triggerAll(newTargetDragId, ev);
      }

      dragEventsContext.end.triggerAll(ev);

      if (currentTargetRef.current) {
        updateCurrentTarget(null);
        targetEventsContext.out.triggerAll(currentTargetRef.current, ev);
      }
    },
    [
      currentTargetRef,
      dragEventsContext.end,
      targetEventsContext.drop,
      targetEventsContext.out,
      updateCurrentTarget,
      updateDraggingItem,
    ],
  );

  const handleDragCancel = useCallback(
    (ev: DragCancelEvent) => {
      if (currentTargetRef.current) {
        updateCurrentTarget(null);
        targetEventsContext.out.triggerAll(currentTargetRef.current, ev);
      }

      dragEventsContext.cancel.triggerAll(ev);
    },
    [
      currentTargetRef,
      dragEventsContext.cancel,
      targetEventsContext.out,
      updateCurrentTarget,
    ],
  );

  return (
    <DndContext
      sensors={useSensors(useSensor(PointerSensor))}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}
    </DndContext>
  );
};

export default DnDProvider;
