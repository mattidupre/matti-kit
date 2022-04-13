import { useContext } from 'react';
import TreeContext from './lib/TreeContext';

import type { TreeContextValue } from './types';

const useOnFullTreeRendered: TreeContextValue['onFullTreeRendered'] = () =>
  useContext(TreeContext).onFullTreeRendered;

export default useOnFullTreeRendered;
