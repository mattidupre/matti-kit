import type { DnDKitDragEvent, DragId } from '~/types';

const getDragIdFromEvent = ({ active: { id: dragId } }: DnDKitDragEvent) =>
  dragId as DragId;

export default getDragIdFromEvent;
