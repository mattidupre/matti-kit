/* eslint-disable no-param-reassign */
import fromDirection from './fromDirection';

import type { Direction } from '@matti-kit/drag';

const setSizeAttribute = (
  direction: Direction,
  el: HTMLElement,
  value?: number,
): void => {
  fromDirection(
    direction,
    () => {
      el.style.height = `${value}px`;
    },
    () => {
      el.style.width = `${value}px`;
    },
  )();
};

export default setSizeAttribute;
