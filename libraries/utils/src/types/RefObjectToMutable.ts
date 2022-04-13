import { RefObject, MutableRefObject } from 'react';

type RefObjectToMutable<Ref extends RefObject<any>> = MutableRefObject<
  Ref['current']
>;

export default RefObjectToMutable;
