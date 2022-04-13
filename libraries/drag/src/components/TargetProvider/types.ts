import type { RefObject } from 'react';
import type { DragId } from '~/types';

export type TargetValue = DragId | null;

export type TargetContextValue = {
  currentTargetRef: React.RefObject<TargetValue>;
  updateCurrentTarget: (newTargetDragId: TargetValue) => void;
  getTargetIsOverRef: (targetDragId: DragId) => RefObject<boolean>;
};
