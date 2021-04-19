export type Dict<T> = {
  [k: string]: T | undefined;
};

// Array.prototype.map, but for Dict
export function mapDict<T>(dict: Dict<T>) {
  const mappedDict: Dict<string> = {};

  Object.keys(dict).map((fileType) => {
    mappedDict[fileType] = `*.${dict[fileType]}`;
  });
}
//
// Array.prototype.reduce, but for Dict
export function reduceDict() {}
