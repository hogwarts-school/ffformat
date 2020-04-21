import { AllowedTypes, typeCollection as T } from '@constant/dataType';
import { computedInitValue, typeOf, isCompositeType } from '@utils/utils';
import PrimitiveType from './PrimitiveType';
import { TypeCreator } from './types';

export interface CompositeTypeParams<T> {
  type: symbol;
  types: TypeCreator.ObjectTypeParams | TypeCreator.AllType;
  defaultValue: T;
  systemDefaultValue: T;
}

function isTypeInstance(value: any) {
  return value instanceof PrimitiveType || value instanceof CompositeType;
}

class CompositeType<Typing extends AllowedTypes.CompositeType> {
  public type: symbol;
  public types: CompositeTypeParams<Typing>['types'];

  private systemDefaultValue: Typing;
  private defaultValue: Typing;

  public get rule(): [CompositeTypeParams<Typing>['types'], Typing] {
    return [
      this.types,
      computedInitValue<Typing>(this.defaultValue, this.type, this.systemDefaultValue)
    ];
  }

  public get value(): [symbol, any, Typing] {
    const [types, defaultValue] = this.rule;
    return [this.type, this.createType(types), defaultValue];
  }

  public constructor({
    type,
    types,
    defaultValue,
    systemDefaultValue
  }: CompositeTypeParams<Typing>) {
    if (!types) {
      throw new Error(`the constructor need types to initialize`);
    }
    if (typeOf(types) !== T.object && !isTypeInstance(types)) {
      throw new Error(`types error`);
    }
    this.type = type;
    this.types = types;
    this.defaultValue = defaultValue;
    this.systemDefaultValue = systemDefaultValue;
  }

  public default = (defaultValue: Typing) => {
    this.defaultValue = defaultValue;
    return this;
  };

  private createType(types: CompositeTypeParams<Typing>['types']) {
    if (isTypeInstance(types)) {
      return types.value;
    }
    return Object.entries(types).reduce((preItem, [key, item]) => {
      if (!isTypeInstance(item)) {
        throw new Error(`the key: ${key} 's value need to be extends class 'Typing'`);
      }
      return {
        ...preItem,
        [key]: item.value
      };
    }, {});
  }
}

export default CompositeType;
