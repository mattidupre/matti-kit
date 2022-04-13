import React from 'react';

import TreeProvider from './components/TreeProvider';
import ChangeProvider from './components/ChangeProvider';

import ListInstance from './components/ListInstance/ListInstance';

import type { Meta } from '@matti-kit/drag';
import type { Spacing, OnListComponentChange, Accept, Direction } from '~/types';

type Props = {
  meta: Meta;
  direction: Direction;
  spacing: Spacing;
  listIndex?: number;
  listChildCount: number;
  accept?: Accept;
  onChange?: OnListComponentChange;
  disableDrop?: boolean;
  children: React.ReactNode;
};

const DeepList: React.FC<Props> = ({
  meta,
  direction,
  spacing,
  listIndex: indexInParent = -1,
  listChildCount,
  accept = null,
  onChange = null,
  disableDrop = false,
  children,
}) => {
  return (
    <ChangeProvider>
      <TreeProvider>
        <ListInstance
          meta={meta}
          direction={direction}
          spacing={spacing}
          indexInParent={indexInParent}
          listChildCount={listChildCount}
          accept={accept}
          onListComponentChange={onChange}
          disableDrop={disableDrop}
        >
          {children}
        </ListInstance>
      </TreeProvider>
    </ChangeProvider>
  );
};

export default DeepList;
