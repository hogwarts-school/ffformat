import { typeOf, computedInitValue } from './../utils';
import { typeCollection as T } from '@constant/dataType';

describe('utils', () => {
  it('typeOf', () => {
    expect(typeOf('croatia')).toEqual(T.string);
    expect(typeOf(21)).toEqual(T.number);
    expect(typeOf(false)).toEqual(T.boolean);
    expect(typeOf({})).toEqual(T.object);
    expect(typeOf([])).toEqual(T.array);
    expect(typeOf([{}])).toEqual(T.array);
    expect(typeOf((null as unknown) as any)).toEqual(T.unknown);
    expect(typeOf((undefined as unknown) as any)).toEqual(T.unknown);
  });

  it('computedInitValue', () => {
    // string
    expect(computedInitValue('croatia', T.string, '')).toBe('croatia');
    expect(computedInitValue(21, T.string, ('croatia' as unknown) as any)).toBe('croatia');

    // number
    expect(computedInitValue(21, T.number, 0)).toBe(21);
    expect(computedInitValue('21', T.number, (0 as unknown) as any)).toBe(0);

    // boolean
    expect(computedInitValue(false, T.boolean, false)).toBe(false);
    expect(computedInitValue('error data', T.boolean, (true as unknown) as any)).toBe(true);

    // object
    expect(computedInitValue({}, T.object, { a: 1, b: 2 })).toEqual({});
    expect(computedInitValue([], T.object, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 });

    // array
    expect(computedInitValue(['red'], T.array, [])).toEqual(['red']);
    expect(computedInitValue({}, T.array, [{ a: 1, b: 2 }])).toEqual([{ a: 1, b: 2 }]);

    // other
    expect(computedInitValue([{}], T.array, [])).toEqual([{}]);
    expect(computedInitValue((null as unknown) as any, T.array, [{ a: 666 }])).toEqual([
      { a: 666 }
    ]);
  });
});
