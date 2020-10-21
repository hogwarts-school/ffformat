import CompositeType from './CompositeType';
import PrimitiveType from './PrimitiveType';
import { TypeCreator } from './types';
declare const typeCreator: {
    string: (defaultValue?: string) => PrimitiveType<string>;
    number: (defaultValue?: number) => PrimitiveType<number>;
    boolean: (defaultValue?: boolean) => PrimitiveType<boolean>;
    array: (types: TypeCreator.ObjectTypeParams | TypeCreator.AllType) => CompositeType<any[]>;
    object: (types: TypeCreator.ObjectTypeParams) => CompositeType<object>;
};
export declare type TypeCreator = typeof typeCreator;
export default typeCreator;
