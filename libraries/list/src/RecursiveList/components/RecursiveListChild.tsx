import React from 'react';
import { DeepListChild } from '~/DeepList';

import type { Meta } from '@matti-kit/drag';

type Props = {
  meta: Meta;
  indexInParent: number;
  children: React.ReactNode;
};

const RecursiveListChild: React.FC<Props> = ({
  meta,
  indexInParent,
  children,
}) => {
  return (
    <DeepListChild meta={meta} listIndex={indexInParent}>
      {children}
    </DeepListChild>
  );
};

export default RecursiveListChild;
