import { typeCollection as T } from '@constant/dataType';
import F from './../creator';

describe('CompositeType', () => {
  describe('object & array', () => {
    it('demo 1', () => {
      const instance = F.object({
        name: F.string(),
        age: F.number(),
        skill: F.array(F.string())
      });

      expect(instance.value).toEqual([
        T.object,
        { name: [T.string, ''], age: [T.number, 0], skill: [T.array, [T.string, ''], []] },
        {}
      ]);
    });

    it('demo 2', () => {
      const instance = F.object({
        goodsCount: F.number(),
        goodsList: F.array({
          goodsId: F.number(),
          goodsName: F.string(),
          goodsPrice: F.number(),
          goodsAttr: F.array({
            attrName: F.string(),
            attrValue: F.array(F.string())
          })
        })
      });

      expect(instance.value).toEqual([
        T.object,
        {
          goodsCount: [T.number, 0],
          goodsList: [
            T.array,
            {
              goodsId: [T.number, 0],
              goodsName: [T.string, ''],
              goodsPrice: [T.number, 0],
              goodsAttr: [
                T.array,
                {
                  attrName: [T.string, ''],
                  attrValue: [T.array, [T.string, ''], []]
                },
                []
              ]
            },
            []
          ]
        },
        {}
      ]);
    });
  });

  describe('object', () => {
    it('basic usage', () => {
      const instance = F.object({ name: F.string(), age: F.number() });
      expect(instance.value).toEqual([T.object, { name: [T.string, ''], age: [T.number, 0] }, {}]);
    });

    it('defaultValue', () => {
      const instance = F.object({}).default({ name: 'croatia', age: 21 });

      expect(instance.value).toEqual([T.object, {}, { name: 'croatia', age: 21 }]);
    });
    it('invalid defaultValue', () => {
      const instance = F.object({}).default((1 as unknown) as object);

      expect(instance.value).toEqual([T.object, {}, {}]);

      instance.default({ name: 'croatia', age: 21 });

      expect(instance.value).toEqual([T.object, {}, { name: 'croatia', age: 21 }]);
    });

    it('basic usage of types', () => {
      const instance = F.object({ name: F.string(), age: F.number() });

      expect(instance.value).toEqual([T.object, { name: [T.string, ''], age: [T.number, 0] }, {}]);
    });

    it('mixed use of types', () => {
      const instance = F.object({
        name: F.string(),
        age: F.number(),
        address: F.object({ province: F.string(), city: F.string(), district: F.string() })
      });

      expect(instance.value).toEqual([
        T.object,
        {
          name: [T.string, ''],
          age: [T.number, 0],
          address: [
            T.object,
            { province: [T.string, ''], city: [T.string, ''], district: [T.string, ''] },
            {}
          ]
        },
        {}
      ]);
    });
  });

  describe('array', () => {
    it('basic usage', () => {
      const instance = F.array(F.number());

      expect(instance.value).toEqual([T.array, [T.number, 0], []]);
    });

    it('defaultValue', () => {
      const instance = F.array(F.string()).default(['croatia']);

      expect(instance.value).toEqual([T.array, [T.string, ''], ['croatia']]);
    });

    it('invalid defaultValue', () => {
      const instance = F.array(F.boolean()).default((false as unknown) as any);

      expect(instance.value).toEqual([T.array, [T.boolean, false], []]);

      instance.default([false]);

      expect(instance.value).toEqual([T.array, [T.boolean, false], [false]]);
    });

    it('basic usage of types', () => {
      const instance = F.array({ name: F.string(), age: F.number() });

      expect(instance.value).toEqual([T.array, { name: [T.string, ''], age: [T.number, 0] }, []]);
    });

    it('mixed use of types', () => {
      const instance = F.array(F.array(F.string()));

      expect(instance.value).toEqual([T.array, [T.array, [T.string, ''], []], []]);
    });
  });
});
