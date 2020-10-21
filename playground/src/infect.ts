export default function extractReturnValue(
  obj: Record<string, any>,
  key: string,
  callback: Function
) {
  const origin = obj[key];

  obj[key] = (...params: any[]) => {
    const value = origin(...params);
    callback(value);
  };
}
