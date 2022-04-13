const getOrSetMapValue = <K, V>(
  map: Map<K, V>,
  key: K,
  createValue: () => V,
): V => {
  if (!map.has(key)) {
    const value = createValue();
    map.set(key, value);
    return value;
  }
  return map.get(key);
};

export default getOrSetMapValue;
