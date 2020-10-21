import { TypeCreator } from '@src/creator/types';
import { AllowedTypes } from '@constant/dataType';
declare const format: (currentData: AllowedTypes.AllDataType, types: TypeCreator.MixTypeValue | TypeCreator.AllType) => unknown;
export declare type Format = typeof format;
export default format;
