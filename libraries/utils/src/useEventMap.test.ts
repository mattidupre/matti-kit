import { renderSimpleHook } from '@matti-kit/fixtures';
import useEventMap from './useEventMap';

let unmount;
let attach;
let detach;
let detachAll;
let trigger;
let triggerAll;
beforeEach(() => {
  ({
    result: {
      current: { attach, detach, detachAll, trigger, triggerAll },
    },
    unmount,
  } = renderSimpleHook(useEventMap));
});

afterEach(() => {
  jest.clearAllMocks();
  unmount();
});

describe('when attaching a callback', () => {
  const callbackSpy = jest.fn();

  beforeEach(() => {
    attach('test', callbackSpy);
  });

  afterEach(() => {
    callbackSpy.mockClear();
  });

  describe('and triggering', () => {
    const mockArgs = ['foo', 'bar'];
    beforeEach(() => {
      trigger('test', ...mockArgs);
    });

    it('DOES call the callback', () => {
      expect(callbackSpy).toHaveBeenCalledTimes(1);
      expect(callbackSpy).toHaveBeenCalledWith(...mockArgs);
    });
  });

  describe('and detaching that callback', () => {
    beforeEach(() => {
      detach('test', callbackSpy);
    });

    describe('and triggering', () => {
      beforeEach(() => {
        trigger('test');
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
        trigger('test');
      });

      it('DOES NOT call the callback', () => {
        expect(callbackSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});

describe('when attaching a callback that detaches a second attached callback', () => {
  const callbackSpy2 = jest.fn();
  const callbackSpy1 = jest.fn(() => detach('test', callbackSpy2));

  beforeEach(() => {
    attach('test', callbackSpy1);
    attach('test', callbackSpy2);
  });

  describe('and triggering', () => {
    beforeEach(() => {
      trigger('test');
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
  const callbackSpy1 = jest.fn(() => attach('test', callbackSpy1));

  beforeEach(() => {
    attach('test', callbackSpy1);
  });

  describe('and triggering', () => {
    beforeEach(() => {
      trigger('test');
    });

    it('DOES CALL the first callback', () => {
      expect(callbackSpy1).toHaveBeenCalledTimes(1);
    });

    it('DOES NOT call the second callback', () => {
      expect(callbackSpy2).toHaveBeenCalledTimes(0);
    });
  });
});

describe('when attaching multiple callbacks to different eventNames', () => {
  const callbackSpyDefault = jest.fn();
  const callbackSpy50 = jest.fn();
  const callbackSpyA = jest.fn();
  const callbackSpyB = jest.fn();
  const callbackSpyC = jest.fn();

  beforeEach(() => {
    attach('testB', callbackSpyB);
    attach('testA', callbackSpyA);
    attach(null, callbackSpyDefault);
    attach('testC', callbackSpyC);
    attach(-50, callbackSpy50);
  });

  describe('and triggering a single eventName', () => {
    beforeEach(() => {
      trigger(-50);
    });

    it('DOES CALL the first callback', () => {
      expect(callbackSpy50).toHaveBeenCalledTimes(1);
    });

    it('DOES NOT call the other callbacks', () => {
      expect(callbackSpyDefault).toHaveBeenCalledTimes(0);
      expect(callbackSpyA).toHaveBeenCalledTimes(0);
      expect(callbackSpyB).toHaveBeenCalledTimes(0);
      expect(callbackSpyC).toHaveBeenCalledTimes(0);
    });
  });

  describe('and triggering all events', () => {
    beforeEach(() => {
      triggerAll();
    });

    it('calls all events once', () => {
      expect(callbackSpyDefault).toHaveBeenCalledTimes(1);
      expect(callbackSpy50).toHaveBeenCalledTimes(1);
      expect(callbackSpyA).toHaveBeenCalledTimes(1);
      expect(callbackSpyB).toHaveBeenCalledTimes(1);
      expect(callbackSpyC).toHaveBeenCalledTimes(1);
    });

    it('calls all events in order', () => {
      expect(callbackSpyDefault).toHaveBeenCalledBefore(callbackSpy50);
      expect(callbackSpy50).toHaveBeenCalledBefore(callbackSpyA);
      expect(callbackSpyA).toHaveBeenCalledBefore(callbackSpyB);
      expect(callbackSpyB).toHaveBeenCalledBefore(callbackSpyC);
    });
  });
});

describe('when not attaching any callbacks', () => {
  it('does not error when triggering', () => {
    expect(() => trigger('test')).not.toThrowError();
  });
});
