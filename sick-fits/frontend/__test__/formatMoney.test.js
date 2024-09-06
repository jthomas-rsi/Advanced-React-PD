import formatMoney from '../lib/formatMoney';

describe('Format Money Function', () => {
  it('converts numbers less than 100 to fractional dollar amounts', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(9)).toEqual('$0.09');
    expect(formatMoney(40)).toEqual('$0.40');
    expect(formatMoney(99)).toEqual('$0.99');
  });
  it('converts input to whole dollar amount without cents', () => {
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(100)).toEqual('$1');
    expect(formatMoney(50000000)).toEqual('$500,000');
  });
  it('function converts numbers to current dollar and cent totals', () => {
    expect(formatMoney(140)).toEqual('$1.40');
    expect(formatMoney(5012)).toEqual('$50.12');
    expect(formatMoney(110)).toEqual('$1.10');
    expect(formatMoney(101)).toEqual('$1.01');
    expect(formatMoney(345345345453)).toEqual('$3,453,453,454.53');
  });
});
