import { computedInitValue, AllowedDataType, typeCollection as T } from './dataType';

export const createValue = <T extends AllowedDataType>(
  value: T,
  type: symbol,
  init: T
): [symbol, T] => {
  return [type, computedInitValue<T>(value, type, init)];
};

export const isCompositeType = (type: symbol) => {
  return [T.array, T.object].includes(type);
};
