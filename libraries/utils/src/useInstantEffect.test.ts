import useInstantEffect from './useInstantEffect';
import { renderSimpleHook } from '@matti-kit/fixtures';

import { useEffect } from 'react';

const callbackSpy = jest.fn(() => {
  // console.log('callbackSpy');
});
const cleanupSpy = jest.fn(() => {
  // console.log('cleanupSpy');
});
const renderSpy = jest.fn(() => {
  // console.log('renderSpy');
});

const clearSpies = () => {
  callbackSpy.mockClear();
  renderSpy.mockClear();
  cleanupSpy.mockClear();
};

const useWrappedInstantEffect = (deps?: Array<any>) => {
  useInstantEffect(() => {
    callbackSpy();
    return () => cleanupSpy();
  }, deps);
  renderSpy();
};

const useWrappedReactEffect = (deps?: Array<any>) => {
  useEffect(() => {
    callbackSpy();
    return () => cleanupSpy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  // Force our renderSpy to fire last.
  useEffect(() => {
    renderSpy();
  });
};

describe.each([
  ['useInstanceEffect', useWrappedInstantEffect],
  ['useEffect (native, for parity)', useWrappedReactEffect],
])('%s', (_, useWrappedSubject) => {
  describe('without dependencies array', () => {
    let rerender;
    let unmount;
    beforeEach(() => {
      ({ rerender, unmount } = renderSimpleHook(useWrappedSubject));
    });

    afterEach(() => {
      unmount();
      clearSpies();
    });

    it('DOES call the callback immediately', () => {
      expect(callbackSpy).toHaveBeenCalledTimes(1);
      expect(callbackSpy).toHaveBeenCalledBefore(renderSpy);
    });

    it('DOES NOT the cleanup callback', () => {
      expect(cleanupSpy).toHaveBeenCalledTimes(0);
    });

    describe('when rerendering', () => {
      beforeEach(() => {
        clearSpies();
        rerender();
      });

      it('DOES call the cleanup callback', () => {
        expect(cleanupSpy).toHaveBeenCalledTimes(1);
      });

      it('DOES call the callback', () => {
        expect(callbackSpy).toHaveBeenCalledTimes(1);
        expect(callbackSpy).toHaveBeenCalledBefore(renderSpy);
      });
    });

    describe('when unmounting', () => {
      beforeEach(() => {
        clearSpies();
        unmount();
      });

      it('DOES NOT call the callback', () => {
        expect(callbackSpy).toHaveBeenCalledTimes(0);
      });

      it('DOES call the cleanup callback', () => {
        expect(cleanupSpy).toHaveBeenCalledTimes(1);
        expect(cleanupSpy).toHaveBeenCalledBefore(renderSpy);
      });
    });
  });

  describe('with dependencies array', () => {
    const dep1 = {};
    const dep2 = {};
    const dep3 = {};

    let rerender;
    let unmount;
    beforeEach(() => {
      ({ rerender, unmount } = renderSimpleHook(useWrappedSubject, [
        dep1,
        dep2,
      ]));
    });

    afterEach(() => {
      unmount();
      clearSpies();
    });

    it('DOES call the callback immediately', () => {
      expect(callbackSpy).toHaveBeenCalledTimes(1);
      expect(callbackSpy).toHaveBeenCalledBefore(renderSpy);
    });

    it('DOES NOT call the cleanup callback', () => {
      expect(cleanupSpy).toHaveBeenCalledTimes(0);
    });

    describe('when rerendering with dependencies that DO NOT change', () => {
      beforeEach(() => {
        clearSpies();
        rerender([dep1, dep2]);
      });

      it('DOES NOT call the callback', () => {
        expect(callbackSpy).toHaveBeenCalledTimes(0);
      });

      it('DOES NOT call the cleanup callback', () => {
        expect(cleanupSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe('when rerendering with dependencies that DO change', () => {
      beforeEach(() => {
        clearSpies();
        rerender([dep1, dep3]);
      });

      it('DOES call the cleanup callback', () => {
        expect(cleanupSpy).toHaveBeenCalledTimes(1);
        expect(cleanupSpy).toHaveBeenCalledBefore(callbackSpy);
      });

      it('DOES call the callback', () => {
        expect(callbackSpy).toHaveBeenCalledTimes(1);
        expect(callbackSpy).toHaveBeenCalledBefore(renderSpy);
      });
    });

    describe('when unmounting', () => {
      beforeEach(() => {
        clearSpies();
        unmount();
      });

      it('DOES NOT call the callback', () => {
        expect(callbackSpy).toHaveBeenCalledTimes(0);
      });

      it('DOES call the cleanup callback', () => {
        expect(cleanupSpy).toHaveBeenCalledTimes(1);
        expect(cleanupSpy).toHaveBeenCalledBefore(renderSpy);
      });
    });
  });
});
