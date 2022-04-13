import useDragOverlay from './useDragOverlay';

type Props = {
  matcher: Parameters<typeof useDragOverlay>[0];
  overlayFactory?: Parameters<typeof useDragOverlay>[1];
};

const Overlay = ({ matcher, overlayFactory }: Props) => {
  useDragOverlay(matcher, overlayFactory);
  return null;
};

export default Overlay;
