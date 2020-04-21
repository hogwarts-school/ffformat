import { AllowedTypes } from '@constant/dataType';
declare function transformData(value: AllowedTypes.PrimitiveType, dataType: symbol, normalValue: AllowedTypes.PrimitiveType): string | number | boolean | undefined;
export { transformData };
