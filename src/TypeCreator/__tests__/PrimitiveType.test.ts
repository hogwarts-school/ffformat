import { typeCollection as T } from '@constant/dataType';
import F from '@typeCreator/creator'

describe('PrimitiveType', () => {
  // string
  describe('string', () => {
    it('basic usage', () => {
      const instance = F.string();

      expect(instance.value).toEqual([T.string, '']);
    });

    it('defaultValue', () => {
      const instance = F.string('croatia');

      expect(instance.value).toEqual([T.string, 'croatia']);

      instance.default('cccboy');

      expect(instance.value).toEqual([T.string, 'cccboy']);
    });

    it('invalid defaultValue', () => {
      const instance = F.string((21 as unknown) as string);

      expect(instance.value).toEqual([T.string, '']);

      instance.default('valid defaultValue');

      expect(instance.value).toEqual([T.string, 'valid defaultValue']);
    });
  });

  // number
  describe('number', () => {
    it('basic usage', () => {
      const instance = F.number();

      expect(instance.value).toEqual([T.number, 0]);
    });

    it('defaultValue', () => {
      const instance = F.number(21);

      expect(instance.value).toEqual([T.number, 21]);

      instance.default(18);

      expect(instance.value).toEqual([T.number, 18]);
    });

    it('invalid defaultValue', () => {
      const instance = F.number(('croatia' as unknown) as number);

      expect(instance.value).toEqual([T.number, 0]);

      instance.default(21);

      expect(instance.value).toEqual([T.number, 21]);
    });
  });

  // boolean
  describe('boolean', () => {
    it('basic usage', () => {
      const instance = F.boolean();

      expect(instance.value).toEqual([T.boolean, false]);
    });

    it('defaultValue', () => {
      const instance = F.boolean(false);

      expect(instance.value).toEqual([T.boolean, false]);

      instance.default(true);

      expect(instance.value).toEqual([T.boolean, true]);
    });

    it('invalid defaultValue', () => {
      const instance = F.boolean(({} as unknown) as boolean);

      expect(instance.value).toEqual([T.boolean, false]);

      instance.default(true);

      expect(instance.value).toEqual([T.boolean, true]);
    });
  });
});
