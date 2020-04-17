import CompositeType from './CompositeType';
import PrimitiveType from './PrimitiveType';
import { ObjectTypeParams, AllType } from './types';
import { typeCollection as T } from '@constant/dataType';

const F = {
  string: (defaultValue = '') =>
    new PrimitiveType({ defaultValue, systemDefaultValue: '', type: T.string }),
  number: (defaultValue = 0) =>
    new PrimitiveType({ defaultValue, systemDefaultValue: 0, type: T.number }),
  boolean: (defaultValue = false) =>
    new PrimitiveType({ defaultValue, systemDefaultValue: false, type: T.boolean }),
  array: (types: ObjectTypeParams | AllType) =>
    new CompositeType<any[]>({ type: T.array, types, defaultValue: [], systemDefaultValue: [] }),
  object: (types: ObjectTypeParams) =>
    new CompositeType<object>({ type: T.object, types, defaultValue: {}, systemDefaultValue: {} })
};

export default F;
