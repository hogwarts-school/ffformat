import { typeCollection as T, AllowedTypes } from '@constant/dataType';

function transformData(
  value: AllowedTypes.PrimitiveType,
  dataType: symbol,
  normalValue: AllowedTypes.PrimitiveType
) {
  switch (dataType) {
    case T.number: {
      const tempRes = Number(value === null ? undefined : value);
      return isNaN(tempRes) ? normalValue || 0 : tempRes;
    }
    case T.string: {
      return String(value || normalValue || '');
    }
    case T.boolean: {
      return Boolean(value);
    }
    default:
  }
}

export { transformData };
