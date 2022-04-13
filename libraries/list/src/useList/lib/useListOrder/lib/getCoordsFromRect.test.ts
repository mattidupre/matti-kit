import getCoordsFromRect from './getCoordsFromRect';

const mockRect = {
  top: 10,
  height: 20,
  left: 50,
  width: 100,
};

it('returns valid coords', () => {
  expect(getCoordsFromRect(mockRect)).toEqual({
    x: 100,
    y: 20,
    row: 100,
    column: 20,
  });
});
