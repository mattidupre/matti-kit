import React, { forwardRef } from 'react';

import type ListDrag from '../../ListDrag';

type Props = React.ComponentProps<typeof ListDrag>;

const ListDragNoop = forwardRef<HTMLDivElement, Props>(
  ({ style, children }, forwardedRef) => (
    <div style={style} ref={forwardedRef}>
      {children}
    </div>
  ),
);

export default ListDragNoop;
