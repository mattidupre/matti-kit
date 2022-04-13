import { useCallback, useRef, useMemo } from 'react';
import alphaNumericSort from './alphaNumericSort';

const DEFAULT_KEY = Symbol('DEFAULT_KEY');

type EventKey = string | number;

const useEventMap = <Fn extends (...args: Array<any>) => void>() => {
  const events = useRef<Map<EventKey | typeof DEFAULT_KEY, Set<Fn>>>(new Map());
  const sortedEventKeys = useRef<Array<EventKey>>([]);

  const triggerEvent = (useCallback((eventKey: EventKey, ...args) => {
    if (!events.current.has(eventKey)) {
      return;
    }

    // Copy the set in case the callback appends an element to that set,
    // thereby causing an infinite loop.
    new Set(events.current.get(eventKey)).forEach((fn) => {
      // Make sure event has not been removed from the map or set
      // by a previous callback.
      if (!events.current.get(eventKey)?.has(fn)) {
        return;
      }

      fn(...args);
    });
  }, []) as unknown) as Fn;

  const triggerAllEvents = (useCallback(
    (...args) => {
      if (events.current.has(DEFAULT_KEY)) {
        triggerEvent(DEFAULT_KEY, ...args);
      }
      sortedEventKeys.current.forEach((sortedEventKey) => {
        triggerEvent(sortedEventKey, ...args);
      });
    },
    [triggerEvent],
  ) as unknown) as Fn;

  const attachEvent = useCallback((eventKeyOption: EventKey, fn: Fn) => {
    const eventKey = eventKeyOption ?? DEFAULT_KEY;

    if (!events.current.has(eventKey)) {
      events.current.set(eventKey, new Set<Fn>());
    }
    events.current.get(eventKey).add(fn);
    if (
      eventKey !== DEFAULT_KEY &&
      !sortedEventKeys.current.includes(eventKey)
    ) {
      sortedEventKeys.current.push(eventKey);
      sortedEventKeys.current.sort(alphaNumericSort);
    }
  }, []);

  const detachEvent = useCallback((eventKey: EventKey, fn: Fn) => {
    if (!events.current.has(eventKey)) {
      return;
    }
    const eventSet = events.current.get(eventKey);
    eventSet.delete(fn);
    if (eventSet.size === 0) {
      events.current.delete(eventKey);
      sortedEventKeys.current.splice(
        sortedEventKeys.current.indexOf(eventKey),
        1,
      );
    }
  }, []);

  const detachAllEvents = useCallback(() => {
    events.current.forEach((eventSet) => eventSet.clear());
    sortedEventKeys.current.length = 0;
  }, []);

  return useMemo(
    () => ({
      trigger: triggerEvent,
      triggerAll: triggerAllEvents,
      attach: attachEvent,
      detach: detachEvent,
      detachAll: detachAllEvents,
    }),
    [triggerEvent, triggerAllEvents, attachEvent, detachEvent, detachAllEvents],
  );
};

export default useEventMap;
