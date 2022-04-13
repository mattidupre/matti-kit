/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import setTransformAttribute from '~/lib/setTransformAttribute';
import setSizeAttribute from '~/lib/setSizeAttribute';

import type { Transform } from '~/useList';

const transformDefault: Transform = () => ({
  initialize: () => ({
    previewStyle: {
      position: 'absolute',
      visibility: 'hidden',
      pointerEvents: 'none',
      opacity: '1',
      transition: 'transform 0.25s',
    },
    itemStyle: {
      transition: 'transform 0.25s',
      backgroundColor: 'red !important',
    },
    placeholderStyle: {
      backgroundColor: 'teal',
      position: 'absolute',
      visibility: 'hidden',
      pointerEvents: 'none',
    },
  }),

  apply: ({
    direction,
    showPlaceholder,
    wrapperPosition,
    previewPosition,
    positions,
    wrapperEl,
    itemEls,
    placeholderEls,
    previewEl,
    isHovering,
    newOrder,
    debug: { listDragId },
  }) => {
    // wrapperEl.style.backgroundColor = isHovering ? 'red' : null;

    const { before: start, size: fullSize } = wrapperPosition;
    const filledSize = positions.reduce(
      (totalSize, { size }) => totalSize + size,
      0,
    );
    const backgroundSize = fullSize - filledSize;
    const spacing = backgroundSize / (itemEls.length - 1);
    let positionPointer = start;
    let listSizePointer = 0;
    let hasInsertion: boolean = false;
    newOrder.items.forEach(({ prevIndex, action }) => {
      let el: HTMLElement;
      if (action === 'DELETE') {
        itemEls[prevIndex].style.visibility = 'hidden';
        if (!showPlaceholder) {
          return;
        }
        el = placeholderEls[prevIndex];
        el.style.display = 'visible';
      } else if (action === 'INSERT') {
        hasInsertion = true;
        el = previewEl;
      } else {
        el = itemEls[prevIndex];
        placeholderEls[prevIndex].style.visibility = 'hidden';
        el.style.visibility = 'visible';
      }
      const { before, size } =
        action === 'INSERT' ? previewPosition : positions[prevIndex];
      setTransformAttribute(direction, el, positionPointer - before);
      positionPointer += spacing + size;
      listSizePointer += spacing + size;
    });

    if (previewEl) {
      previewEl.style.visibility = hasInsertion ? 'visible' : 'hidden';
    }

    setSizeAttribute(direction, wrapperEl, listSizePointer - spacing);
  },

  reset: ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    direction,
    itemEls,
    placeholderEls,
    wrapperEl,
    previewEl,
  }) => {
    itemEls.forEach((itemEl) => {
      itemEl.style.transform = null;
      itemEl.style.visibility = 'visible';
    });

    placeholderEls.forEach((placeholderEl) => {
      placeholderEl.style.transform = null;
      placeholderEl.style.visibility = 'hidden';
    });

    previewEl.style.transform = null;
    previewEl.style.visibility = 'hidden';
  },
});

export default transformDefault;
