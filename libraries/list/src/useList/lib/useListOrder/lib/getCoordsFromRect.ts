import type { Coords } from '../../../types';

type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const getCoordsFromRect = (rect: Rect): Coords => {
  const x = (window?.scrollX ?? 0) + rect.left + rect.width / 2;
  const y = (window?.scrollY ?? 0) + rect.top + rect.height / 2;
  return {
    x,
    y,
    row: x,
    column: y,
  };
};

export default getCoordsFromRect;
