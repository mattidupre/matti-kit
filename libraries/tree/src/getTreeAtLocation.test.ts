import getTreeAtLocation from './getTreeAtLocation';
import buildMockSimpleTree from './fixtures/buildMockSimpleTree';

let mockTree: ReturnType<typeof buildMockSimpleTree>;

beforeEach(() => {
  mockTree = buildMockSimpleTree();
});

describe('given a top location', () => {
  it('returns the top tree', () => {
    expect(getTreeAtLocation(mockTree, [])?.value.name).toBe('Ruby Delgado');
  });
});

describe('given a child location one level deep WITH NO children', () => {
  it('returns the child tree', () => {
    expect(getTreeAtLocation(mockTree, [0])?.value.name).toBe('Celia Waters');
  });
});

describe('given a child location one level deep WITH children', () => {
  it('returns the child tree', () => {
    expect(getTreeAtLocation(mockTree, [1])?.value.name).toBe('Lura Richards');
  });
});

describe('given a child location two levels deep', () => {
  it('returns the child tree', () => {
    expect(getTreeAtLocation(mockTree, [1, 2])?.value.name).toBe(
      'Chester Kennedy',
    );
  });
});

describe('given a location that does not exist', () => {
  it('returns undefined', () => {
    expect(getTreeAtLocation(mockTree, [1, 2, 3])?.value.name).toBe(undefined);
  });
});
