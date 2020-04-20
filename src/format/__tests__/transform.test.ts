import { transformData } from '../transform';
import { typeCollection as T } from '@constant/dataType';

describe('transformData', () => {
  describe('string format', () => {
    it('basic usage', () => {
      const v = transformData('croatia', T.string, '');

      expect(v).toBe('croatia');
    });
    it('format exception', () => {
      const v = transformData((null as unknown) as string, T.string, '');

      expect(v).toBe('');
    });

    it('use defaultValue when format format exception', () => {
      const v = transformData((null as unknown) as string, T.string, 'croatia');

      expect(v).toBe('croatia');
    });
  });

  describe('number format', () => {
    it('basic usage', () => {
      const v = transformData(21, T.number, 0);

      expect(v).toBe(21);
    });
    it('format exception', () => {
      const v = transformData('croatia', T.number, 0);

      expect(v).toBe(0);
    });

    it('use defaultValue when format format exception', () => {
      const v = transformData('croatia', T.number, 21);

      expect(v).toBe(21);
    });
  });

  describe('boolean format', () => {
    it('basic usage', () => {
      const v = transformData('croatia', T.boolean, false);

      expect(v).toBe(true);
    });
  });
});
