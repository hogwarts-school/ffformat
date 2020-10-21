export declare namespace AllowedTypes {

  export type ArrayType = any[];

  export type PrimitiveType = string | number | boolean;
  export type CompositeType = ArrayType | object;

  export type AllDataType = CompositeType | PrimitiveType;
}

const arrayType = Symbol('array');
const objectType = Symbol('object');
const booleanType = Symbol('boolean');
const stringType = Symbol('string');
const numberType = Symbol('number');
const unknownType = Symbol('unknown');

export const typeCollection = {
  array: arrayType,
  object: objectType,
  string: stringType,
  number: numberType,
  boolean: booleanType,
  unknown: unknownType
};
export type typeCollectionKeys = keyof typeof typeCollection;
