import { useContext } from 'react';
import {
  isLocationDescendantOfLocation,
  getRelativeLocation,
  getTreeAtLocation,
} from '@matti-kit/tree';
import { useSortedDragEvent } from '@matti-kit/drag';
import buildPayloadFromTree from '../../../lib/buildPayloadFromTree';
import clonePayload from '../../../lib/clonePayload';
import ChangeContext from './ChangeContext';
import useGetTreeByDragId from './useGetTreeByDragId';

import type { DragId } from '@matti-kit/drag';
import type {
  TreeLocation,
  ListPayload,
  ListTree,
  ChangeAction,
} from '~/types';

const useTopChangeHandler = (currentTree: ListTree) => {
  const { flushChangeQueue } = useContext(ChangeContext);
  const isTop = !currentTree.parent;

  // const findParentTreeWithCallback = useFindParentTreeWithCallback();
  const getTreeByDragId = useGetTreeByDragId();

  useSortedDragEvent(
    'end',
    Infinity,
    isTop
      ? () => {
          const currentChangeQueue = flushChangeQueue();

          const queuesByCallbackDragIdMap: Map<
            DragId,
            {
              queue: Array<ChangeAction>;
              location: TreeLocation;
            }
          > = new Map();

          currentChangeQueue.forEach((queueData) => {
            let nearestTreeWithCallback: ListTree | null = null;

            // TODO: Abstract into a util
            let currentNearestTree: ListTree | null = getTreeByDragId(
              queueData.listDragId,
            );
            while (currentNearestTree) {
              if (currentTree.value.listAttributes.onListComponentChange) {
                nearestTreeWithCallback = currentTree;
                break;
              }
              currentNearestTree = currentTree.parent;
            }

            if (!nearestTreeWithCallback) {
              throw new Error('No callback found.');
            }
            const {
              value: { dragId: queueCallbackDragId },
              location: queueCallbackLocation,
            } = nearestTreeWithCallback;

            const combinedQueue = [queueData];

            let queuesByCallbackDragIdBail = false;
            queuesByCallbackDragIdMap.forEach(
              (
                { queue: thisCallbackQueue, location: thisCallbackLocation },
                thisCallbackDragId,
              ) => {
                // this could be optimized by doing this once for queueData.location
                //  then again for nearest callback if no match?

                if (queuesByCallbackDragIdBail) {
                  return;
                }

                if (
                  // if current queue is descendant of this callback, append queue
                  isLocationDescendantOfLocation(
                    queueCallbackLocation,
                    thisCallbackLocation,
                  )
                ) {
                  thisCallbackQueue.push(queueData);
                  queuesByCallbackDragIdBail = true;
                } else if (
                  // if callback is descendant of current queue
                  isLocationDescendantOfLocation(
                    thisCallbackLocation,
                    queueCallbackLocation,
                  )
                ) {
                  combinedQueue.push(...thisCallbackQueue);
                  queuesByCallbackDragIdMap.delete(thisCallbackDragId);
                }
              },
            );
            if (queuesByCallbackDragIdBail) {
              return;
            }

            queuesByCallbackDragIdMap.set(queueCallbackDragId, {
              queue: combinedQueue,
              location: queueCallbackLocation,
            });
          });

          queuesByCallbackDragIdMap.forEach(
            ({ location: callbackLocation, queue }, callbackDragId) => {
              const callbackTree = getTreeByDragId(callbackDragId);
              if (!callbackTree) {
                throw new Error('Cannot find tree.');
              }

              const callbackPayload = buildPayloadFromTree(callbackTree);

              queue.forEach((event) => {
                const eventTree = getTreeByDragId(event.listDragId);
                if (!eventTree) {
                  throw new Error('Cannot find tree.');
                }
                const callbackPayloadAtEvent = getTreeAtLocation(
                  callbackPayload,
                  getRelativeLocation(callbackLocation, eventTree.location),
                );
                if (!callbackPayloadAtEvent) {
                  throw new Error('Cannot find nested payload.');
                }
                if (!callbackPayloadAtEvent.children) {
                  throw new Error('Nested payload does not contain children.');
                }

                const {
                  action,
                  draggingPayload,
                  order: { prevIndexes },
                } = event;

                if (action === 'INSERT') {
                  const clonedDraggingPayload = clonePayload(
                    draggingPayload,
                  ) as ListPayload;

                  clonedDraggingPayload.parent = callbackPayloadAtEvent;

                  callbackPayloadAtEvent.children = prevIndexes.map(
                    (prevIndex) =>
                      prevIndex === -1
                        ? clonedDraggingPayload
                        : callbackPayloadAtEvent.children[prevIndex],
                  );
                  console.log('insert', callbackPayloadAtEvent);
                } else if (action === 'DELETE') {
                  console.log('delete', callbackPayloadAtEvent);
                  callbackPayloadAtEvent.children = prevIndexes.map(
                    (prevIndex) => callbackPayloadAtEvent.children[prevIndex],
                  );
                } else if (action === 'REORDER') {
                  console.log('reorder', callbackPayloadAtEvent);
                  callbackPayloadAtEvent.children = prevIndexes.map(
                    (prevIndex) => callbackPayloadAtEvent.children[prevIndex],
                  );
                } else {
                  throw new Error(`Invalid action "${action}".`);
                }
              });

              callbackTree.value.listAttributes.onListComponentChange(
                callbackPayload,
              );
            },
          );
        }
      : undefined,
  );
};

export default useTopChangeHandler;
