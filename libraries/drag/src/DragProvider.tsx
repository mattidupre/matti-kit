import React from 'react';

import DragEventsProvider from './components/DragEventsProvider';
import TargetEventsProvider from './components/TargetEventsProvider';
import TargetProvider from './components/TargetProvider';
import DraggingItemProvider from './components/DraggingItemProvider';
import DragOverlayProvider from './components/DragOverlayProvider';
import DnDProvider from './components/DnDProvider';

const DragProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <DragEventsProvider>
    <TargetEventsProvider>
      <TargetProvider>
        <DraggingItemProvider>
          <DnDProvider>
            <DragOverlayProvider>{children}</DragOverlayProvider>
          </DnDProvider>
        </DraggingItemProvider>
      </TargetProvider>
    </TargetEventsProvider>
  </DragEventsProvider>
);

export default DragProvider;
