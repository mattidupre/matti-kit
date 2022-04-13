import { useMemo, useRef, createRef } from 'react';

import type { DragId } from '@matti-kit/drag';

type Options = {
  listDragId: DragId;
  childDragIds: Array<DragId>;
};

const useListRefs = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  listDragId,
  childDragIds,
}: Options) => {
  const listElRef = useRef<HTMLDivElement>();

  const itemElRefs = useMemo(
    () => childDragIds.map(() => createRef<HTMLDivElement>()),
    [childDragIds],
  );

  const placeholderElRefs = useMemo(
    () => childDragIds.map(() => createRef<HTMLDivElement>()),
    [childDragIds],
  );

  const previewElRef = useRef<HTMLDivElement>();

  return useMemo(
    () => ({
      listElRef,
      itemElRefs,
      placeholderElRefs,
      previewElRef,
    }),
    [itemElRefs, placeholderElRefs],
  );
};

export default useListRefs;
