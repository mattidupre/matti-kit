import React, { forwardRef, useMemo } from 'react';

import type { DragId } from '@matti-kit/drag';

type Props = {
  style?: React.CSSProperties;
  listDragId: DragId;
};

const ListPreview = forwardRef<HTMLDivElement, Props>(
  ({ style: styleProp, listDragId }, elRef) => {
    // TODO: Come up with a way to render a full list from here?

    const style = useMemo<React.CSSProperties>(
      () => ({
        ...styleProp,
      }),
      [styleProp],
    );

    return (
      <div ref={elRef} style={style}>
        {`${listDragId} Preview`}
      </div>
    );
  },
);

export default ListPreview;
