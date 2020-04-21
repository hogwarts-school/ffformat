export declare namespace AllowedTypes {
    type ArrayType = any[];
    type PrimitiveType = string | number | boolean;
    type CompositeType = ArrayType | object;
    type AllDataType = CompositeType | PrimitiveType;
}
export declare const typeCollection: {
    array: symbol;
    object: symbol;
    string: symbol;
    number: symbol;
    boolean: symbol;
    unknown: symbol;
};
export declare type typeCollectionKeys = keyof typeof typeCollection;
