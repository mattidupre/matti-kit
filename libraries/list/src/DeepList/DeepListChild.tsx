import React, { useMemo } from 'react';
import ItemInstance from './components/ItemInstance/ItemInstance';

import type { Meta } from '@matti-kit/drag';
import type { Handle, ItemAttributes } from '../types';

type Props = {
  meta: Meta;
  handle?: Handle;
  listIndex: number;
  children: React.ReactNode;
};

const DeepListChild: React.FC<Props> = ({
  meta,
  handle = false,
  listIndex: indexInParent,
  children,
}) => {
  const itemAttributes = useMemo<ItemAttributes>(() => {
    return {
      handle,
    };
  }, [handle]);

  return (
    <ItemInstance
      itemMeta={meta}
      itemAttributes={itemAttributes}
      indexInParent={indexInParent}
    >
      {children}
    </ItemInstance>
  );
};

export default DeepListChild;
