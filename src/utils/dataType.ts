const arrayType = Symbol('array');
const objectType = Symbol('object');
const booleanType = Symbol('boolean');
const stringType = Symbol('string');
const numberType = Symbol('number');
const nullType = Symbol('null');

export const typeCollection = {
  array: arrayType,
  object: objectType,
  string: stringType,
  number: numberType,
  boolean: booleanType,
  null: nullType
};

export type typeCollectionKeys = keyof typeof typeCollection;

export type AllowedDataType = Array<any> | object | string | number | boolean | null;

export const typeOf = (data: AllowedDataType) => {
  const type = ({}.toString.call(data).slice(8, -1) as string).toLowerCase() as typeCollectionKeys;

  if (typeCollection[type]) {
    return typeCollection[type];
  }
};

export const computedInitValue = <T extends AllowedDataType>(
  data: T,
  type: symbol,
  initValue: T
) => {
  return typeOf(data) === type ? data : initValue;
};
