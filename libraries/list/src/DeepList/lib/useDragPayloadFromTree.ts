import { useCallback, useRef } from 'react';
import { useDragEvent, getDragIdFromEvent } from '@matti-kit/drag';
import buildPayloadFromTree from './buildPayloadFromTree';

import type { ListTree, ListPayload } from '~/types';

const useDragPayloadFromTree = (tree: ListTree): ListPayload => {
  const { current: payload } = useRef<ListPayload>({} as ListPayload);

  useDragEvent(
    'start',
    useCallback(
      (ev) => {
        if (getDragIdFromEvent(ev) !== tree.value.dragId) {
          return;
        }
        Object.assign(payload, buildPayloadFromTree(tree));
      },
      [payload, tree],
    ),
  );

  return payload;
};

export default useDragPayloadFromTree;
