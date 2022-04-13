const getElBaseRect = (boundingClientRect: DOMRect) => {
  const { top, right, bottom, left, width, height } = boundingClientRect;

  const scrollX = window?.scrollX ?? 0;
  const scrollY = window?.scrollY ?? 0;

  return {
    top: top + scrollY,
    right: right + scrollX,
    bottom: bottom + scrollY,
    left: left + scrollX,
    width,
    height,
  };

  // const {
  //   offsetWidth: width,
  //   offsetHeight: height,
  //   offsetTop: top,
  //   offsetLeft: left,
  // } = el;
  // return {
  //   top,
  //   right: left + width,
  //   bottom: top + height,
  //   left,
  //   width,
  //   height,
  // };
};

export default getElBaseRect;
