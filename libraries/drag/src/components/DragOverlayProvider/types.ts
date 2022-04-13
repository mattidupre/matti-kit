import type { ReactElement } from 'react';
import type { Payload } from '~/types';

type Factory = (payload: Payload) => ReactElement;
type Matcher = (payload: Payload) => boolean;

export type DragOverlayContextValue = {
  defaultFactory: Factory;
  factoriesByUid: Map<string, Factory>;
  factoriesWithMatchers: Set<readonly [Matcher, Factory]>;
};
