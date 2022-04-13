import { useRef } from 'react';

const useMap = <Key extends any, Value extends any>() => {
  const mapRef = useRef<Map<Key, Value>>(new Map());
  return mapRef.current;
};

export default useMap;
