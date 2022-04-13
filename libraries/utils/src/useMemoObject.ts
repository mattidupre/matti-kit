import { useMemo } from 'react';

const useMemoObject = <T extends Record<string, any>>(obj: T): T =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => obj, Object.values(obj));

export default useMemoObject;
