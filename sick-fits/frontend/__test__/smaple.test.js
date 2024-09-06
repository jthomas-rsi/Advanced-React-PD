const add = (a, b) => parseInt(a) + parseInt(b);

describe('Sample test 101', () => {
  it('value is as expected ', () => {
    const value = 'expected';

    expect(value).toEqual('expected');
  });
  it('adds two things together ', () => {
    const value = 1 + 1;

    expect(value).toEqual(2);
  });

  it('can add two numbers ', () => {
    const sum = add(1, 2);

    expect(sum).toEqual(3);
  });
  it('can add two strings as numbers ', () => {
    const sum = add('2', '5');

    expect(sum).toEqual(7);
  });
});
