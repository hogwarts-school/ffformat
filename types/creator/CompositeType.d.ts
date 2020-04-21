import { AllowedTypes } from '@constant/dataType';
import { TypeCreator } from './types';
export interface CompositeTypeParams<T> {
    type: symbol;
    types: TypeCreator.ObjectTypeParams | TypeCreator.AllType;
    defaultValue: T;
    systemDefaultValue: T;
}
declare class CompositeType<Typing extends AllowedTypes.CompositeType> {
    type: symbol;
    types: CompositeTypeParams<Typing>['types'];
    private systemDefaultValue;
    private defaultValue;
    get rule(): [CompositeTypeParams<Typing>['types'], Typing];
    get value(): [symbol, any, Typing];
    constructor({ type, types, defaultValue, systemDefaultValue }: CompositeTypeParams<Typing>);
    default: (defaultValue: Typing) => this;
    private createType;
}
export default CompositeType;
