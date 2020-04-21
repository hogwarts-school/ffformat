import { AllowedTypes } from '@constant/dataType';
export declare const typeOf: (data: AllowedTypes.AllDataType) => symbol;
export declare const computedInitValue: <T extends AllowedTypes.AllDataType>(data: T, type: symbol, initValue: T) => T;
export declare const isCompositeType: (type: symbol) => boolean;
