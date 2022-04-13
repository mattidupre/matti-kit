import setTransformAttribute from './setTransformAttribute';

let el: HTMLDivElement;
beforeEach(() => {
  el = document.createElement('div');
  el.style.transform = 'translate3d(1px, 2px, 3px)';
});

describe('when no value is provided', () => {
  it('sets resets the transform to 0,0', () => {
    setTransformAttribute('row', el);
    expect(el.style.transform).toBe('translate3d(0px, 0px, 0px)');
  });
});

describe('when direction is row', () => {
  it('sets the transform attribute', () => {
    setTransformAttribute('row', el, 123);
    expect(el.style.transform).toBe('translate3d(123px, 0px, 0px)');
  });
});

describe('when direction is column', () => {
  it('sets the transform attribute', () => {
    setTransformAttribute('column', el, 123);
    expect(el.style.transform).toBe('translate3d(0px, 123px, 0px)');
  });
});
