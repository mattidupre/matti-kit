const alphaNumericSort = (a: string | number, b: string | number) =>
  (a as number) - (b as number) || a.toString().localeCompare(b.toString());

export default alphaNumericSort;
