import { AllowedTypes } from '@constant/dataType';
export interface PrimitiveTypeParams<T> {
    type: symbol;
    defaultValue: T;
    systemDefaultValue: T;
}
declare class PrimitiveType<T extends AllowedTypes.PrimitiveType> {
    type: symbol;
    private defaultValue;
    private systemDefaultValue;
    get value(): [symbol, T];
    constructor({ type, defaultValue, systemDefaultValue }: PrimitiveTypeParams<T>);
    default: (defaultValue: T) => this;
    private createValue;
}
export default PrimitiveType;
