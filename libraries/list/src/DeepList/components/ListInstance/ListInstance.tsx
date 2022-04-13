import React, { useMemo } from 'react';
import mergeRefs from 'react-merge-refs';
import { usePersistentMemo, useStyles } from '@matti-kit/utils';
import { createDragId } from '@matti-kit/drag';
import useList from '~/useList';
import transformDefault from '~/lib/transformDefault';
import { useListStyle } from '~/styles';
import { useRegisterCurrentTree } from '../TreeProvider';
import { useListOnChange } from '../ChangeProvider';
import useDragPayloadFromTree from '../../lib/useDragPayloadFromTree';
import useListPayloadFromTree from './lib/useListPayloadFromTree';

import ListDrag from '~/components/ListDrag';
import ListChildPlaceholder from '../ListChildPlaceholder';
import ListDragNoop from './components/ListDragNoop';
import ListOverlay from './components/ListOverlay';
import ListPreview from './components/ListPreview';

import type { Meta } from '@matti-kit/drag';
import type {
  Spacing,
  Direction,
  OnListComponentChange,
  Accept,
  ListTreeValue,
  ItemTreeValue,
} from '~/types';

type Props = {
  meta: Meta;
  direction: Direction;
  spacing: Spacing;
  indexInParent: number;
  listChildCount: number;
  accept: Accept;
  onListComponentChange: OnListComponentChange;
  disableDrop?: boolean;
  children: React.ReactNode;
};

const ListInstance: React.FC<Props> = ({
  meta,
  direction,
  spacing,
  indexInParent,
  listChildCount,
  accept,
  onListComponentChange,
  disableDrop: disableDropOverride,
  children,
}) => {
  const [currentTree, setCurrentTreeValue] = useRegisterCurrentTree<
    ItemTreeValue,
    ListTreeValue
  >(indexInParent, () => ({}));

  const listDepth = currentTree.location.length;

  const handle = listDepth > 0;

  const {
    dragId: listDragId,
    dragElRef: listDragElRef,
    dragStyle: listDragStyle,
    placeholderElRef: listPlaceholderElRef,
    placeholderStyle: listPlaceholderStyle,
  } = currentTree.parent?.value.childValues[indexInParent] ??
  usePersistentMemo(
    () => ({
      dragId: createDragId(),
      dragElRef: null,
      dragStyle: null,
      placeholderElRef: null,
      placeholderStyle: null,
    }),
    [],
  );

  const childDragIds = usePersistentMemo(
    () =>
      Array(listChildCount)
        .fill(null)
        .map(() => createDragId()),
    [listChildCount],
  );

  const {
    initialize: initializeTransform,
    apply: applyTransform,
    reset: resetTransform,
  } = useMemo(() => transformDefault(), []);

  const dragPayload = useDragPayloadFromTree(currentTree);

  const listPayload = useListPayloadFromTree(currentTree);

  const disableDrop = false; // useCurrentListIsDisabled(disableDropOverride);

  const handleChange = useListOnChange(listDragId, currentTree);

  const {
    listRef: listElRef,
    itemRefs: childDragElRefs,
    placeholderRefs: childPlaceholderElRefs,
    itemStyle: childDragStyle,
    placeholderStyle: childPlaceholderStyle,
    previewRef: previewElRef,
    previewStyle: previewElStyle,
    // TODO: Add reset method
  } = useList({
    listPayload,
    listDragId,
    childDragIds,
    direction,
    initializeTransform,
    applyTransform,
    resetTransform,
    onChange: handleChange,
    clone: false,
    disableDrop,
    listDepth, // TODO: Change to "callbackOrder"
  });

  // These will eventually vary based on position.
  const childDragStyles = usePersistentMemo(
    () => childDragIds.map(() => childDragStyle),
    [childDragIds, childDragStyle],
  );

  // These will eventually vary based on position.
  const childPlaceholderStyles = usePersistentMemo(
    () => childDragIds.map(() => childPlaceholderStyle),
    [childDragIds, childDragStyle],
  );

  const dragStyle = useStyles(
    useListStyle({
      direction,
      spacing,
      handle,
    }),
    listDragStyle,
  );

  // TODO: Memoize
  setCurrentTreeValue((prevTree) =>
    Object.assign(prevTree, {
      isList: true,
      dragId: listDragId,
      meta,
      listAttributes: { direction, handle, spacing, onListComponentChange },
      childValues: childDragIds.map((_, childIndex) => ({
        dragId: childDragIds[childIndex],
        dragElRef: childDragElRefs[childIndex],
        dragStyle: childDragStyles[childIndex],
        placeholderElRef: childPlaceholderElRefs[childIndex],
        placeholderStyle: childPlaceholderStyles[childIndex],
      })),
    }),
  );

  // TODO: Just add a "disabled" prop to ListDrag?
  const ThisListDrag = listDepth > 0 ? ListDrag : ListDragNoop;

  return (
    <>
      <ThisListDrag
        dragId={listDragId}
        direction={direction}
        payload={dragPayload}
        handle={handle}
        ref={mergeRefs([listDragElRef, listElRef])}
        style={dragStyle}
      >
        {children}
        <ListPreview
          ref={previewElRef}
          style={previewElStyle}
          listDragId={listDragId}
        />
      </ThisListDrag>
      {listDepth >= 0 ? (
        <ListChildPlaceholder
          ref={listPlaceholderElRef}
          style={listPlaceholderStyle}
        />
      ) : null}
      <ListOverlay
        listDragId={listDragId}
        direction={direction}
        spacing={spacing}
      >
        {children}
      </ListOverlay>
    </>
  );
};

export default ListInstance;
