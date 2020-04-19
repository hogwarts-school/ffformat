import PrimitiveType from './PrimitiveType';
import CompositeType from './CompositeType';
import { AllowedTypes } from '@constant/dataType';

export declare namespace TypeCreator {
  export type CompositeTypes = CompositeType<object> | CompositeType<AllowedTypes.ArrayType>;
  export type PrimitiveTypes =
    | PrimitiveType<string>
    | PrimitiveType<number>
    | PrimitiveType<boolean>;

  export type AllType = CompositeTypes | PrimitiveTypes;

  export type ObjectTypeParams = Record<string, TypeCreator.AllType>;

  export type PrimitiveValue = [symbol, AllowedTypes.PrimitiveType];

  export type AllValue<T> = PrimitiveValue | T;

  export type CompositeValue = [
    symbol,
    Record<string, AllValue<CompositeValue>> | AllValue<CompositeValue>,
    AllowedTypes.CompositeType
  ];

  export type MixTypeValue = PrimitiveValue | CompositeValue;
}
