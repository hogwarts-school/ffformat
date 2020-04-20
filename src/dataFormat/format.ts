import { TypeCreator } from '@typeCreator/types';
import { AllowedTypes, typeCollection as T } from '@constant/dataType';
import { typeOf } from '@utils/utils';
import { transformData } from './transform';

const format = (
  currentData: AllowedTypes.AllDataType,
  types: TypeCreator.MixTypeValue | TypeCreator.AllType
): unknown => {
  const innerTypes = (typeOf(types) === T.array
    ? types
    : (types as TypeCreator.AllType).value) as TypeCreator.MixTypeValue;
  const currentType = innerTypes[0];

  switch (currentType) {
    case T.string:
    case T.number:
    case T.boolean: {
      const [dataType, normalValue] = innerTypes;
      return transformData(
        currentData as AllowedTypes.PrimitiveType,
        dataType,
        normalValue as AllowedTypes.PrimitiveType
      );
    }
    case T.array: {
      const [_, items, normalValue] = innerTypes as [symbol, TypeCreator.MixTypeValue, any];
      const itemsType = typeOf(items) === T.object ? T.object : ((items as unknown) as [symbol])[0];

      if (typeOf(currentData) !== T.array) {
        return normalValue;
      }

      const itemsTypeValue = (itemsType === T.object
        ? [T.object, items, format({}, [T.object, items, {}])]
        : items) as TypeCreator.MixTypeValue;

      return (currentData as AllowedTypes.ArrayType).map((v) => {
        return format(v, itemsTypeValue);
      });
    }
    case T.object: {
      const [_, properties, normalValue] = innerTypes;
      if (typeOf(currentData) !== T.object) {
        return normalValue;
      }

      return Object.entries(properties).reduce((preItem, [key, value]) => {
        return {
          ...preItem,
          [key]: format((currentData as any)[key], value)
        };
      }, {});
    }
    default:
      return null;
  }
};

export default format;
