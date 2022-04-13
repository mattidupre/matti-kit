import { useCallback, useRef } from 'react';
import { useDragEvent, useTargetEvent } from '@matti-kit/drag';
import buildPayloadFromTree from '../../../lib/buildPayloadFromTree';

import type { ListTree, ListPayload } from '~/types';

const useListPayloadFromTree = (tree: ListTree): ListPayload => {
  const { current: payload } = useRef<ListPayload>({} as ListPayload);
  const isDirtyRef = useRef<boolean>();

  useDragEvent(
    'end',
    useCallback(() => {
      isDirtyRef.current = true;
    }, []),
  );

  useTargetEvent(
    tree.value.dragId,
    'over',
    useCallback(() => {
      if (isDirtyRef.current === false) {
        return;
      }
      isDirtyRef.current = false;
      Object.assign(payload, buildPayloadFromTree(tree));
    }, [payload, tree]),
  );

  return payload;
};

export default useListPayloadFromTree;
