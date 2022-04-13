import iterateDownTree from './iterateDownTree';
import getTreeAtLocation from '../getTreeAtLocation';
import buildMockTreeAll from '../fixtures/buildMockTreeAll';

type IterateDownTreeOptions = Parameters<typeof iterateDownTree>[1];

let mockSimpleTree: ReturnType<typeof buildMockTreeAll>['mockSimpleTree'];
let expectedLocationOrder: Array<Array<number>>;

beforeEach(() => {
  ({
    mockSimpleTree,
    allMockLocations: expectedLocationOrder,
  } = buildMockTreeAll());
});

describe('with discrete parent and child callbacks', () => {
  const parentCallbackSpy = jest.fn();
  const childCallbackSpy = jest.fn();

  beforeEach(() => {
    iterateDownTree(mockSimpleTree, {
      parentCallback: parentCallbackSpy,
      childCallback: childCallbackSpy,
    });
  });

  afterEach(() => {
    parentCallbackSpy.mockClear();
    childCallbackSpy.mockClear();
  });

  it('calls both callbacks', () => {
    expect(parentCallbackSpy).toHaveBeenCalled();
    expect(childCallbackSpy).toHaveBeenCalled();
  });
});

describe('with a callback that DOES NOT call this.break()', () => {
  const callbackSpy = jest.fn();

  beforeEach(() => {
    iterateDownTree(mockSimpleTree, { callback: callbackSpy });
  });

  afterEach(() => {
    callbackSpy.mockClear();
  });

  it('calls the callback once for each value', () => {
    expect(callbackSpy).toHaveBeenCalledTimes(expectedLocationOrder.length);
  });

  it('calls the callback with the current original tree', () => {
    expectedLocationOrder.forEach((expectedLocation, expectedCallIndex) => {
      const currentTree = callbackSpy.mock.calls[expectedCallIndex][0];
      expect(currentTree).toEqual(
        getTreeAtLocation(mockSimpleTree, expectedLocation),
      );
    });
  });

  it('calls the callback with the current location (in order)', () => {
    expectedLocationOrder.forEach((expectedLocation, expectedCallIndex) => {
      const currentLocation = callbackSpy.mock.calls[expectedCallIndex][1];
      expect(currentLocation).toEqual(expectedLocation);
    });
  });

  it('calls the callback with the parent tree in this context', () => {
    callbackSpy.mock.instances.forEach(({ parentTree }, callIndex) => {
      const currentLocation = callbackSpy.mock.calls[callIndex][1];
      const expectedParent =
        currentLocation.length > 0
          ? getTreeAtLocation(mockSimpleTree, currentLocation.slice(0, -1))
          : null;
      expect(parentTree).toBe(expectedParent);
    });
  });
});

describe('with a callback that DOES call this.break() on the 3rd call', () => {
  let callCount = 0;
  // eslint-disable-next-line func-names
  const callbackSpy = jest.fn(function (
    this: ThisParameterType<NonNullable<IterateDownTreeOptions['callback']>>,
  ) {
    callCount += 1;
    if (callCount === 3) {
      this.break();
    }
  });

  beforeEach(() => {
    iterateDownTree(mockSimpleTree, {
      callback: callbackSpy,
    });
  });

  afterEach(() => {
    callbackSpy.mockClear();
  });

  it('calls the callback 3 times', () => {
    expect(callbackSpy).toHaveBeenCalledTimes(3);
  });
});
