import PrimitiveType from './PrimitiveType';
import CompositeType from './CompositeType';
import { AllowedTypes } from '@constant/dataType';
export declare namespace TypeCreator {
    type CompositeTypes = CompositeType<object> | CompositeType<AllowedTypes.ArrayType>;
    type PrimitiveTypes = PrimitiveType<string> | PrimitiveType<number> | PrimitiveType<boolean>;
    type AllType = CompositeTypes | PrimitiveTypes;
    type ObjectTypeParams = Record<string, TypeCreator.AllType>;
    type PrimitiveValue = [symbol, AllowedTypes.PrimitiveType];
    type AllValue<T> = PrimitiveValue | T;
    type CompositeValue = [symbol, Record<string, AllValue<CompositeValue>> | AllValue<CompositeValue>, AllowedTypes.CompositeType];
    type MixTypeValue = PrimitiveValue | CompositeValue;
}
