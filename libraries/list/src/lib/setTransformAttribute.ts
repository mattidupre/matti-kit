/* eslint-disable no-param-reassign */
import fromDirection from './fromDirection';

import type { Direction } from '~/types';

const setTransformAttribute = (
  direction: Direction,
  el: HTMLElement,
  value?: number,
): void => {
  let transform: string;
  if (value === undefined) {
    transform = 'translate3d(0px, 0px, 0px)';
  } else {
    fromDirection(
      direction,
      () => {
        transform = `translate3d(0px, ${value}px, 0px)`;
      },
      () => {
        transform = `translate3d(${value}px, 0px, 0px)`;
      },
    )();
  }
  el.style.transform = transform;
};

export default setTransformAttribute;
