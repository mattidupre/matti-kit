import React, { forwardRef } from 'react';
import { useStyles } from '@matti-kit/utils';
import { useListChildStyle } from '~/styles';

import type { Direction } from '~/types';

type Props = {
  direction: Direction;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const StaticListChild = forwardRef<HTMLDivElement, Props>(
  ({ direction, style: styleProp = {}, children = null }, refObject) => {
    const style = useStyles(
      useListChildStyle({ direction, handle: false }),
      styleProp,
    );

    return (
      <div style={style} ref={refObject}>
        {children}
      </div>
    );
  },
);

export default StaticListChild;
