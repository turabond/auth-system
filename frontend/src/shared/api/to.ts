export const to = <T>(promise: Promise<T>): Promise<[Error | null, T | null]> =>
  promise.then<[null, T]>((data) => [null, data]).catch<[Error, null]>((err) => [err, null]);
