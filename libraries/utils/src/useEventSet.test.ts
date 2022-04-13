import { renderSimpleHook } from '@matti-kit/fixtures';
import useEventSet from './useEventSet';

let unmount;
let attach;
let detach;
let detachAll;
let trigger;
beforeEach(() => {
  ({
    result: {
      current: { attach, detach, detachAll, trigger },
    },
    unmount,
  } = renderSimpleHook(useEventSet));
});

afterEach(() => {
  jest.clearAllMocks();
  unmount();
});

describe('when attaching a callback', () => {
  const callbackSpy = jest.fn();

  beforeEach(() => {
    attach(callbackSpy);
  });

  afterEach(() => {
    callbackSpy.mockClear();
  });

  describe('and triggering', () => {
    const mockArgs = ['foo', 'bar'];
    beforeEach(() => {
      trigger(...mockArgs);
    });

    it('DOES call the callback', () => {
      expect(callbackSpy).toHaveBeenCalledTimes(1);
      expect(callbackSpy).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('and detaching that callback', () => {
    beforeEach(() => {
      detach(callbackSpy);
    });

    describe('and triggering', () => {
      beforeEach(() => {
        trigger();
      });

      it('DOES NOT call the callback', () => {
        expect(callbackSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('and detaching all callbacks', () => {
    beforeEach(() => {
      detachAll();
    });

    describe('and triggering', () => {
      beforeEach(() => {
        trigger();
      });

      it('DOES NOT call the callback', () => {
        expect(callbackSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});

describe('when attaching a callback that detaches a second attached callback', () => {
  const callbackSpy2 = jest.fn();
  const callbackSpy1 = jest.fn(() => detach(callbackSpy2));

  beforeEach(() => {
    attach(callbackSpy1);
    attach(callbackSpy2);
  });

  describe('and triggering', () => {
    beforeEach(() => {
      trigger();
    });

    it('DOES call the first callback', () => {
      expect(callbackSpy1).toHaveBeenCalledTimes(1);
    });

    it('DOES NOT call the second callback', () => {
      expect(callbackSpy2).toHaveBeenCalledTimes(0);
    });
  });
});

describe('when attaching a callback that attaches a second callback', () => {
  const callbackSpy2 = jest.fn();
  const callbackSpy1 = jest.fn(() => attach(callbackSpy1));

  beforeEach(() => {
    attach(callbackSpy1);
  });

  describe('and triggering', () => {
    beforeEach(() => {
      trigger();
    });

    it('DOES CALL the first callback', () => {
      expect(callbackSpy1).toHaveBeenCalledTimes(1);
    });

    it('DOES NOT call the second callback', () => {
      expect(callbackSpy2).toHaveBeenCalledTimes(0);
    });
  });
});
