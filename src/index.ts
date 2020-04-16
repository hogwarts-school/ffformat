import CompositeType from './TypeCreator/CompositeType';
import PrimitiveType from './TypeCreator/PrimitiveType';
import { ObjectTypeParams, PrimitiveTypes } from './TypeCreator/types';
import { typeCollection as T } from './utils/dataType';

const F = {
  string: (defaultValue?: string) =>
    new PrimitiveType({ defaultValue, systemDefaultValue: '', type: T.string }),
  number: (defaultValue?: number) =>
    new PrimitiveType({ defaultValue, systemDefaultValue: 0, type: T.number }),
  boolean: (defaultValue?: boolean) =>
    new PrimitiveType({ defaultValue, systemDefaultValue: false, type: T.boolean }),
  array: (types: ObjectTypeParams | PrimitiveTypes) =>
    new CompositeType({ type: T.array, types, defaultValue: [], systemDefaultValue: [] }),
  object: (types: ObjectTypeParams) =>
    new CompositeType({ type: T.object, types, defaultValue: {}, systemDefaultValue: {} })
};

export default F;
