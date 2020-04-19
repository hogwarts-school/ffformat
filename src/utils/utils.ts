import { AllowedTypes, typeCollectionKeys, typeCollection as T } from '@constant/dataType';

export const typeOf = (data: AllowedTypes.AllDataType) => {
  const type = ({}.toString.call(data).slice(8, -1) as string).toLowerCase() as typeCollectionKeys;

  if (T[type]) {
    return T[type];
  }
  return T.unknown;
};

export const computedInitValue = <T extends AllowedTypes.AllDataType>(
  data: T,
  type: symbol,
  initValue: T
) => {
  return typeOf(data) === type ? data : initValue;
};


export const isCompositeType = (type: symbol) => {
  return [T.array, T.object].includes(type);
};
