const getElTransformedRect = (el: HTMLElement) => {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height,
  } = el.getBoundingClientRect();
  return {
    top,
    right,
    bottom,
    left,
    width,
    height,
  };
};

export default getElTransformedRect;
