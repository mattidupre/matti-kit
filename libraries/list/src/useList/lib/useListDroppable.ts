import { useDroppable } from '@matti-kit/drag';

import type { UseListOptions } from '../types';

type Options = Pick<
  UseListOptions,
  'listDragId' | 'disableDrop' | 'listPayload'
>;

const useListDroppable = ({
  listDragId,
  disableDrop,
  listPayload,
}: Options) => {
  const { setNodeRef: listElRef } = useDroppable({
    dragId: listDragId,
    disabled: disableDrop,
    payload: listPayload,
  });
  return {
    listElRef,
  };
};

export default useListDroppable;
