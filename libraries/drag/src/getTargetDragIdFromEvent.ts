import type { DnDKitDragEvent, DragId } from '~/types';

const getTargetDragIdFromEvent = (ev: DnDKitDragEvent): DragId | null =>
  ((ev as unknown) as { over: { id: DragId } }).over?.id ?? null;

export default getTargetDragIdFromEvent;
