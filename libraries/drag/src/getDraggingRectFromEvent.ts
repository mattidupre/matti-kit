import type { DnDKitDragEvent } from '~/types';

const getDraggingRectFromEvent = ({
  active: {
    rect: { current },
  },
}: DnDKitDragEvent) => current?.translated;

export default getDraggingRectFromEvent;
