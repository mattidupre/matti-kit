import React, { useRef, useMemo } from 'react';
import DragOverlayContext from './lib/DragOverlayContext';
import DragOverlayContainer from './components/DragOverlayContainer';
import DefaultDragOverlay from './components/DefaultDragOverlay';

import type { DragOverlayContextValue } from './types';

type Props = { children: React.ReactNode };

const DragOverlayProvider: React.FC<Props> = ({ children }) => {
  const factoriesByUidRef = useRef<DragOverlayContextValue['factoriesByUid']>(
    new Map(),
  );
  const factoriesWithMatchersRef = useRef<
    DragOverlayContextValue['factoriesWithMatchers']
  >(new Set());

  const dragOverlayContextValue = useMemo<DragOverlayContextValue>(
    () => ({
      defaultFactory: (payload) => <DefaultDragOverlay payload={payload} />,
      factoriesByUid: factoriesByUidRef.current,
      factoriesWithMatchers: factoriesWithMatchersRef.current,
    }),
    [],
  );

  return (
    <DragOverlayContext.Provider value={dragOverlayContextValue}>
      <DragOverlayContainer />
      {children}
    </DragOverlayContext.Provider>
  );
};

export default DragOverlayProvider;
