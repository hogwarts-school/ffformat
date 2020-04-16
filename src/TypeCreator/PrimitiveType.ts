import { createValue } from './../utils/utils';
import { AllowedDataType } from './../utils/dataType';
import Type from './Type';

export interface PrimitiveTypeParams<T> {
  type: symbol;
  defaultValue: T;
  systemDefaultValue: T;
}

class PrimitiveType<T extends AllowedDataType> extends Type {
  public type: symbol;

  private defaultValue: T;
  private systemDefaultValue: T;

  public get value() {
    return createValue(this.defaultValue, this.type, this.systemDefaultValue);
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
}

export default PrimitiveType;
