export const isObject = (val: any): val is object =>
  toString.call(val) === '[object Object]'

export const get = <T = any>(
  object: Record<string, any> | undefined,
  path: string | string[],
  defaultVal?: T
): T | undefined => {
  const _path = Array.isArray(path)
    ? path
    : path.split('.').filter(i => i.length)

  if (object && _path.length) {
    return get(object[_path.shift() as string], _path, defaultVal)
  }

  return object === undefined ? defaultVal : (object as unknown as T)
}
