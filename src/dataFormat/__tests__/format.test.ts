import format from './../format';
import F from '@typeCreator/creator';

describe('format', () => {
  it('base usage', () => {
    const v = format('aaa', F.number());

    expect(v).toBe(0);
  });
});
