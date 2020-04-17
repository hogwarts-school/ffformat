import { AllowedTypes, typeCollection as T } from '@constant/dataType';
import { computedInitValue, typeOf, isCompositeType } from '@utils/utils';
import Type from './Type';
import { ObjectTypeParams, AllType } from './types';

export interface CompositeTypeParams<T> {
  type: symbol;
  types: ObjectTypeParams | AllType;
  defaultValue: T;
  systemDefaultValue: T;
}

class CompositeType<Typing extends AllowedTypes.CompositeType> extends Type {
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

  public constructor({ type, types, defaultValue, systemDefaultValue }: CompositeTypeParams<Typing>) {
    super();
    if (!types) {
      throw new Error(`the constructor need types to initialize`);
    }
    if (typeOf(types) !== T.object && !(types instanceof Type)) {
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
    if (types instanceof Type) {
      return types.value;
    }
    return Object.entries(types).reduce((preItem, [key, item]) => {
      if (!(item instanceof Type)) {
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
