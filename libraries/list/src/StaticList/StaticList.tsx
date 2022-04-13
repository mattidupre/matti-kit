import React, { forwardRef } from 'react';
import { useStyles } from '@matti-kit/utils';
import { useListStyle } from '~/styles';

import type { Spacing, Direction } from '~/types';

type Props = {
  direction: Direction;
  spacing: Spacing;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const StaticList = forwardRef<HTMLDivElement, Props>(
  ({ direction, style: styleProp = {}, spacing = 0, children }, elRef) => {
    const style = useStyles(
      useListStyle({ direction, spacing, handle: false }),
      styleProp,
    );
    return (
      <div style={style} ref={elRef}>
        {children}
      </div>
    );
  },
);

export default StaticList;
