import { useCallback, useRef } from 'react';
import { rectIntersection } from '@dnd-kit/core';

import type { CollisionDetection } from '@dnd-kit/core';

type CollisionValue = {};

const useCollisionDetection = () => {
  const collisionRef = useRef<CollisionValue>({});

  const collisionDetection: CollisionDetection = useCallback(
    (entries, target) => {
      const result = rectIntersection(entries, target);
      return result;
    },
    [],
  );

  return [collisionRef, collisionDetection] as const;
};

export default useCollisionDetection;
