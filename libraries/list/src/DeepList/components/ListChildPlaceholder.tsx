import React, { forwardRef } from 'react';

type Props = {
  style: React.CSSProperties;
  children?: React.ReactNode;
};

const ListChildPlaceholder = forwardRef<HTMLElement, Props>(
  ({ style, children }, forwardedRef) => {
    //
    return (
      <div
        ref={forwardedRef as React.MutableRefObject<HTMLDivElement>}
        style={style}
      >
        {children}
      </div>
    );
  },
);

export default ListChildPlaceholder;
