/**
 *
 *
 * string() => Symbol('string')
 *
 * number() => Symbol('number')
 *
 * null() => Symbol('null')
 *
 *
 *
 *
 * f(21, f.string('0')),
 * f('1', f.number(0)),
 * f(a, f.null())
 *
 * f({a: 1, b: 2}, f.object({ a: f.string(), b: f.string() }))
 *
 *
 *
 *  */
import F from '../../index';
// import { sum } from './../creator';

describe('f', () => {
  it('string', () => {
    const f = F.object({
      name: F.string('666'),
      age: F.number(),
      tel: F.number(),
      shopInfo: F.object({}),
      companyInfo: F.object({
        companyName: F.string(),
        companyId: F.number()
      }).default({ companyName: '', companyId: 1 }),

      goodsList: F.array({
        goodsName: F.string(),
        goodsId: F.number(),
        goodsDesc: F.string(),
        goodsAttr: F.array(F.string('属性test'))
      })
    });

    // console.log(JSON.stringify(f.value), 'ffff');
    // console.log(F.array(F.string('属性test')).default(['1']).value, 'ffff');
    // console.log(F.array({ a: F.number(666) }).default(['1']).value, 'ffff');
    // console.log(f.value, '7777');
  });
});
