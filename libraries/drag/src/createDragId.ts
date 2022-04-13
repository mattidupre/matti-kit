import type { DragId } from '~/types';

let counter = 0;
const createDragId = (prefix?: string | null) => {
  const prefixStr = prefix ? `${prefix}_` : 'dnd_';
  // eslint-disable-next-line no-plusplus
  return `${prefixStr}${counter++}` as DragId;
};

export default createDragId;
