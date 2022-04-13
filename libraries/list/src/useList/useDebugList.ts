import { useCallback, useMemo } from 'react';

import { useStateGetterControlled } from '@matti-kit/utils';
import useListRefs from './lib/useListRefs';
import useListPositions from './lib/useListPositions';
import useListTransform from './lib/useListTransform';

import type { ListItemParsed, ListData, Direction } from '@matti-kit/drag';

type Options = {
  uid: ListData['uid'];
  items: Array<ListItemParsed>;
  direction: Direction;
};

const useDebugList = ({
  uid: listUid,
  items: itemsOption,
  direction,
}: Options) => {
  const [items] = useStateGetterControlled(itemsOption);
  const itemUids = useMemo(() => items.map(({ uid }) => uid), [items]);

  const { listElRef, itemElRefs, previewElRef } = useListRefs({
    listUid,
    itemUids,
  });

  const {
    isPositionDirtyRef,
    itemBasePositionsRef,
    previewBasePositionRef,
    buildListRect,
    buildItemPositions,
    buildPreviewPosition,
  } = useListPositions({
    listUid,
    direction,
    listElRef,
    itemElRefs,
    previewElRef,
  });

  const { transform, reset: resetTransform } = useListTransform({
    listUid,
    direction,
    isPositionDirtyRef,
    itemElRefs,
    itemBasePositionsRef,
    previewElRef,
    previewBasePositionRef,
  });

  const buildPositions = useCallback(() => {
    buildListRect();
    buildPreviewPosition();
    buildItemPositions();
  }, [buildItemPositions, buildListRect, buildPreviewPosition]);

  return useMemo(
    () => ({
      listElRef,
      itemElRefs,
      previewElRef,
      buildPositions,
      transform,
      resetTransform,
    }),
    [
      buildPositions,
      itemElRefs,
      listElRef,
      previewElRef,
      resetTransform,
      transform,
    ],
  );
};

export default useDebugList;
