import getElBaseRect from './getElBaseRect';

const el = ({
  getBoundingClientRect: jest.fn(() => ({
    top: 10,
    right: 150,
    bottom: 15,
    left: 100,
    width: 50,
    height: 5,
  })),
} as unknown) as HTMLDivElement;

global.scrollX = 1000;
global.scrollY = 10000;

describe('when given an element', () => {
  it('returns the dimensions', () => {
    expect(getElBaseRect(el)).toEqual({
      top: global.scrollY + 10,
      right: global.scrollX + 100 + 50,
      bottom: global.scrollY + 10 + 5,
      left: global.scrollX + 100,
      width: 50,
      height: 5,
    });
  });
});
