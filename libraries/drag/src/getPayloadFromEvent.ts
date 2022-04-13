import type { DnDKitDragEvent, Payload } from '~/types';

const getPayloadFromEvent = ({
  active: {
    data: { current: activeItemData },
  },
}: DnDKitDragEvent) => activeItemData as Payload;

export default getPayloadFromEvent;
