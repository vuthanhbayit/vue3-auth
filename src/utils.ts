export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'
