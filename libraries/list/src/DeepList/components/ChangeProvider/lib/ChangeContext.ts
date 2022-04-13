// eslint-disable-next-line filenames/match-exported
import { createContext } from 'react';

import type { ChangeContextValue } from '../types';

export default createContext<ChangeContextValue>(
  (undefined as unknown) as ChangeContextValue,
);
