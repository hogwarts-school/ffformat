import { TypeCreator } from '@src/creator/types';
import { AllowedTypes } from '@constant/dataType';
declare const format: (currentData: AllowedTypes.AllDataType, types: import("../creator/CompositeType").default<object> | import("../creator/CompositeType").default<AllowedTypes.ArrayType> | import("../creator/PrimitiveType").default<string> | import("../creator/PrimitiveType").default<number> | import("../creator/PrimitiveType").default<boolean> | TypeCreator.PrimitiveValue | TypeCreator.CompositeValue) => unknown;
export declare type Format = typeof format;
export default format;
