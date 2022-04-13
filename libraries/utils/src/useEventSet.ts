import { useCallback, useRef, useMemo } from 'react';

const useEventSet = <Fn extends (...args: Array<any>) => void>() => {
  const events = useRef<Set<Fn>>(new Set());

  const triggerEvent = (useCallback((...args) => {
    // Copy the set in case the callback appends an element to that set,
    // thereby causing an infinite loop.
    new Set(events.current).forEach((fn) => {
      // Make sure event has not been removed from the set
      // by a previous callback.
      if (!events.current.has(fn)) {
        return;
      }

      fn(...args);
    });
  }, []) as unknown) as Fn;

  const attachEvent = useCallback((fn: Fn) => {
    events.current.add(fn);
  }, []);

  const detachEvent = useCallback((fn: Fn) => {
    events.current.delete(fn);
  }, []);

  const detachAllEvents = useCallback(() => {
    events.current.clear();
  }, []);

  return useMemo(
    () => ({
      trigger: triggerEvent,
      attach: attachEvent,
      detach: detachEvent,
      detachAll: detachAllEvents,
    }),
    [attachEvent, detachEvent, triggerEvent, detachAllEvents],
  );
};

export default useEventSet;
