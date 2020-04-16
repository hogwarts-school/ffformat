import { AllowedDataType, computedInitValue, typeCollection as T } from './../utils/dataType';
import Type from './Type';
import { ObjectTypeParams, PrimitiveTypes } from './types';

export interface CompositeTypeParams<T> {
  type: symbol;
  types: ObjectTypeParams | PrimitiveTypes;
  defaultValue: T;
  systemDefaultValue: T;
}

class CompositeType<T extends AllowedDataType> extends Type {
  public type: symbol;
  public types: CompositeTypeParams<T>['types'];

  private systemDefaultValue: T;
  private defaultValue: T;

  public get rule(): [CompositeTypeParams<T>['types'], T] {
    return [
      this.types,
      computedInitValue<T>(this.defaultValue, this.type, this.systemDefaultValue)
    ];
  }

  public get value() {
    const [types] = this.rule;
    return [this.type, this.createType(types), this.defaultValue];
  }

  public constructor({ type, types, defaultValue, systemDefaultValue }: CompositeTypeParams<T>) {
    super();
    this.type = type;
    this.types = types;
    this.defaultValue = defaultValue;
    this.systemDefaultValue = systemDefaultValue;
  }

  public default = (defaultValue: T) => {
    this.defaultValue = defaultValue;
    return this;
  };

  private createType(types: CompositeTypeParams<T>['types']) {

    if (types instanceof Type) {
      return types.value;
    }
    return Object.entries(types).reduce((preItem, [key, item]) => {
      return {
        ...preItem,
        [key]: item.value
      };
    }, {});
  }
}

export default CompositeType;
