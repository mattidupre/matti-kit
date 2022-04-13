import React from 'react';
import RecursiveListParent from './components/RecursiveListParent';

import type { Meta } from '@matti-kit/drag';
import type { RecursiveListTree, RenderChild } from './types';

type Props = {
  tree: RecursiveListTree;
  renderChild: RenderChild;
  getKeyFromMeta: (meta: Meta) => string | number;
};

const RecursiveList: React.FC<Props> = function RecursiveList({
  tree: currentTree,
  renderChild,
  getKeyFromMeta,
}) {
  console.log('original state', currentTree);
  return (
    <RecursiveListParent
      currentTree={currentTree}
      getKeyFromMeta={getKeyFromMeta}
      renderChild={renderChild}
    />
  );
};

export default RecursiveList;
