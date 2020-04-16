import PrimitiveType from './PrimitiveType';
import CompositeType from './CompositeType';

export type CompositeTypes = CompositeType<object> | CompositeType<any[]>;
export type PrimitiveTypes = PrimitiveType<string> | PrimitiveType<number> | PrimitiveType<boolean>;

export type AllType = CompositeTypes | PrimitiveTypes;

export type ObjectTypeParams = Record<string, AllType>;
