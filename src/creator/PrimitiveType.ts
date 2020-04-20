import { computedInitValue } from '@utils/utils';
import { AllowedTypes } from '@constant/dataType';
import Type from './Type';

export interface PrimitiveTypeParams<T> {
  type: symbol;
  defaultValue: T;
  systemDefaultValue: T;
}



class PrimitiveType<T extends AllowedTypes.PrimitiveType> extends Type {
  public type: symbol;

  private defaultValue: T;
  private systemDefaultValue: T;

  public get value() {
    return this.createValue(this.defaultValue, this.type, this.systemDefaultValue);
  }
  public constructor({ type, defaultValue, systemDefaultValue }: PrimitiveTypeParams<T>) {
    super();
    this.type = type;
    this.defaultValue = defaultValue;
    this.systemDefaultValue = systemDefaultValue;
  }

  public default = (defaultValue: T) => {
    this.defaultValue = defaultValue;
    return this;
  };

  private createValue = <T extends AllowedTypes.PrimitiveType>(
    value: T,
    type: symbol,
    init: T
  ): [symbol, T] => {
    return [type, computedInitValue<T>(value, type, init)];
  };
}

export default PrimitiveType;
