import React from 'react';

import type { Payload } from '~/types';

type Props = {
  payload: Payload;
  children: React.ReactNode;
};

const DefaultDragOverlay: React.VFC<Props> = () => {
  return (
    <div style={{ backgroundColor: 'red', width: 50, height: 50 }}>
      OVERLAY UNDEFINED
    </div>
  );
};

export default DefaultDragOverlay;
