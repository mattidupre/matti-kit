import React from 'react';
import { useStyles } from '@matti-kit/utils';
import { useListChildStyle } from '~/styles';
import { useRegisterChildItem } from '../TreeProvider';
import ListDrag from '~/components/ListDrag';
import ListChildPlaceholder from '../ListChildPlaceholder';
import ListChildOverlay from './components/ListChildOverlay';
import useDragPayloadFromTree from '../../lib/useDragPayloadFromTree';

import type { Meta } from '@matti-kit/drag';
import type { ItemAttributes, ItemTreeValue, ListTreeValue } from '~/types';

type Props = {
  itemMeta: Meta;
  itemAttributes: ItemAttributes;
  indexInParent: number;
  children: React.ReactNode;
};

const ItemInstance: React.FC<Props> = ({
  itemMeta: meta,
  itemAttributes,
  indexInParent,
  children,
}) => {
  const [itemTree, setCurrentItemTree] = useRegisterChildItem<
    ItemTreeValue,
    ListTreeValue
  >(indexInParent, () => ({}));

  const { handle: itemHandle } = itemAttributes;

  const { direction: listDirection, spacing: listSpacing } =
    itemTree.parent.value.listAttributes;

  const {
    dragId: itemDragId,
    dragElRef: itemDragElRef,
    dragStyle: itemDragStyle,
    placeholderElRef: itemPlaceholderElRef,
    placeholderStyle: itemPlaceholderStyle,
  } = itemTree.parent.value.childValues[indexInParent];

  const dragPayload = useDragPayloadFromTree(itemTree);

  const dragStyle = useStyles(
    useListChildStyle({
      handle: itemHandle,
      direction: listDirection,
      spacing: listSpacing,
    }),
    itemDragStyle,
  );

  // TODO: Memoize
  setCurrentItemTree((prevTree) =>
    Object.assign(prevTree, {
      isList: false,
      meta,
      dragId: itemDragId,
      listAttributes: itemTree.parent.value.listAttributes,
    }),
  );

  return (
    <>
      <ListDrag
        dragId={itemDragId}
        payload={dragPayload}
        direction={listDirection}
        ref={itemDragElRef}
        style={dragStyle}
      >
        {children}
      </ListDrag>
      <ListChildPlaceholder
        ref={itemPlaceholderElRef}
        style={itemPlaceholderStyle}
      />
      <ListChildOverlay listChildDragId={itemDragId} direction={listDirection}>
        {children}
      </ListChildOverlay>
    </>
  );
};

export default ItemInstance;
