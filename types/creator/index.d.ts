import CompositeType from './CompositeType';
import PrimitiveType from './PrimitiveType';
import { TypeCreator } from './types';
declare const typeCreator: {
    string: (defaultValue?: string) => PrimitiveType<string>;
    number: (defaultValue?: number) => PrimitiveType<number>;
    boolean: (defaultValue?: boolean) => PrimitiveType<boolean>;
    array: (types: CompositeType<object> | CompositeType<import("../constant/dataType").AllowedTypes.ArrayType> | PrimitiveType<string> | PrimitiveType<number> | PrimitiveType<boolean> | Record<string, TypeCreator.AllType>) => CompositeType<any[]>;
    object: (types: Record<string, TypeCreator.AllType>) => CompositeType<object>;
};
export declare type TypeCreator = typeof typeCreator;
export default typeCreator;
