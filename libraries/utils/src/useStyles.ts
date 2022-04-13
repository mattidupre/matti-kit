import { useMemo } from 'react';

import type { CSSProperties } from 'react';

const useStyles = (...styles: Array<CSSProperties>) =>
  useMemo<CSSProperties>(
    () => styles.reduce((o, s) => Object.assign(o, s), {}),
    [styles],
  );

export default useStyles;
