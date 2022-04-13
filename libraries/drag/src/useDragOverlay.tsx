import { useEffect } from 'react';
import { useDragOverlayContext } from './components/DragOverlayProvider';

import type { Uid, DragId, ItemFactory, ItemMatcher } from '~/types';

const useDragOverlay = (
  matcher: DragId | Uid | ItemMatcher,
  overlayFactory: ItemFactory,
) => {
  const { factoriesByUid, factoriesWithMatchers } = useDragOverlayContext();

  useEffect(() => {
    if (typeof matcher !== 'string' || overlayFactory === undefined) {
      return;
    }
    factoriesByUid.set(matcher, overlayFactory);
    // eslint-disable-next-line consistent-return
    return () => {
      factoriesByUid.delete(matcher);
    };
  }, [factoriesByUid, overlayFactory, matcher]);

  useEffect(() => {
    if (typeof matcher !== 'function' || overlayFactory === undefined) {
      return;
    }
    const overlayEntry = [matcher, overlayFactory] as const;
    factoriesWithMatchers.add(overlayEntry);
    // eslint-disable-next-line consistent-return
    return () => {
      factoriesWithMatchers.delete(overlayEntry);
    };
  }, [overlayFactory, matcher, factoriesWithMatchers]);
};

export default useDragOverlay;
