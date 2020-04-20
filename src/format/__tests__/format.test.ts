import format from '../format';
import F from '@src/creator';

describe('format', () => {
  describe('usage of string', () => {
    it('base usage', () => {
      const v = format('croatia', F.string());

      expect(v).toBe('croatia');
    });

    it('format', () => {
      const v = format(21, F.string());

      expect(v).toBe('21');
    });

    it('format exception', () => {
      const v = format((null as unknown) as any, F.string());

      expect(v).toBe('');
    });

    it('use defaultValue when format exception', () => {
      const v = format((null as unknown) as any, F.string('croatia'));

      expect(v).toBe('croatia');
    });
  });

  describe('usage of number', () => {
    it('base usage', () => {
      const v = format(21, F.number());

      expect(v).toBe(21);
    });

    it('format', () => {
      const v = format('21', F.number());

      expect(v).toBe(21);
    });

    it('format exception', () => {
      const v = format('croatia', F.number());

      expect(v).toBe(0);
    });

    it('use defaultValue when format exception', () => {
      const v = format('croatia', F.number(21));

      expect(v).toBe(21);
    });
  });

  describe('usage of boolean', () => {
    it('base usage', () => {
      const v = format(false, F.boolean());

      expect(v).toBe(false);
    });

    it('format', () => {
      const v = format(1, F.boolean());

      expect(v).toBe(true);
    });
  });

  describe('usage of array', () => {
    it('base usage', () => {
      const v = format(['1', '2', '3', '4'], F.array(F.string()));

      expect(v).toEqual(['1', '2', '3', '4']);
    });

    it('format', () => {
      const v = format([1, 2, 3, 4], F.array(F.string()));

      expect(v).toEqual(['1', '2', '3', '4']);
    });

    it('format exception', () => {
      const v = format('croatia', F.array(F.string()));

      expect(v).toEqual([]);
    });

    it('use defaultValue when format exception', () => {
      const v = format('croatia', F.array(F.string()).default(['croatia']));

      expect(v).toEqual(['croatia']);
    });

    it('items format exception', () => {
      const v = format(['croatia', 'say', ':', 'xing', '8'], F.array(F.number()));

      expect(v).toEqual([0, 0, 0, 0, 8]);
    });

    it('items use defaultValue when format exception', () => {
      const v = format(['croatia', 'say', ':', 'xing', '8'], F.array(F.number(666)));

      expect(v).toEqual([666, 666, 666, 666, 8]);
    });
  });

  describe('usage of object', () => {
    it('basic usage', () => {
      const v = format(
        { name: 'croatia', age: 21 },
        F.object({ name: F.string(), age: F.number() })
      );

      expect(v).toEqual({ name: 'croatia', age: 21 });
    });

    it('format', () => {
      const v = format(
        { name: 'croatia', age: '21' },
        F.object({ name: F.string(), age: F.number() })
      );

      expect(v).toEqual({ name: 'croatia', age: 21 });
    });

    it('format exception', () => {
      const v = format('croatia', F.object({ name: F.string(), age: F.number() }));

      expect(v).toEqual({});
    });

    it('use defaultValue when format exception', () => {
      const v = format(
        'croatia',
        F.object({ name: F.string(), age: F.number() }).default({ name: 'croatia', age: 21 })
      );

      expect(v).toEqual({ name: 'croatia', age: 21 });
    });

    it('properties format exception', () => {
      const v = format(
        { name: 'croatia', age: 'croatia' },
        F.object({ name: F.string(), age: F.number() })
      );

      expect(v).toEqual({ name: 'croatia', age: 0 });
    });

    it('properties use defaultValue when format exception', () => {
      const v = format(
        { name: 'croatia', age: 'croatia' },
        F.object({ name: F.string(), age: F.number(21) })
      );

      expect(v).toEqual({ name: 'croatia', age: 21 });
    });
  });

  describe('usage of mixed', () => {
    it('demo1', () => {
      const v = format(
        { name: 'croatia', age: '21', skillId: ['1', '2', '3', '4'] },
        F.object({ name: F.string(), age: F.number(), skillId: F.array(F.number()) })
      );

      expect(v).toEqual({
        name: 'croatia',
        age: 21,
        skillId: [1, 2, 3, 4]
      });
    });

    it('demo2', () => {
      const v = format(
        {
          goodsName: 'IphoneSE',
          price: '3299.99',
          goodsAttr: [{ attrName: null, attrValues: ['红色', '黑色', '白色'] }],
          shopInfo: null
        },
        F.object({
          goodsName: F.string(),
          price: F.number(),
          goodsAttr: F.array({
            attrName: F.string('默认属性名'),
            attrValues: F.array({
              attr: F.string('默认属性值o'),
              attrId: F.number(666)
            }).default(['默认属性值'])
          }),
          shopInfo: F.object({
            shopName: F.string('默认店铺名'),
            shopId: F.number(),
            shopLevel: F.number(1),
            shopTags: F.array(F.string('默认标签x'))
          }).default({ shopName: '暂无该店铺', shopId: 0, shopLevel: -1, shopTags: [] })
        })
      );

      expect(v).toEqual({
        goodsName: 'IphoneSE',
        price: 3299.99,
        goodsAttr: [
          {
            attrName: '默认属性名',
            attrValues: [
              {
                attr: '默认属性值o',
                attrId: 666
              },
              {
                attr: '默认属性值o',
                attrId: 666
              },
              {
                attr: '默认属性值o',
                attrId: 666
              }
            ]
          }
        ],
        shopInfo: { shopName: '暂无该店铺', shopId: 0, shopLevel: -1, shopTags: [] }
      });
    });
  });
});
