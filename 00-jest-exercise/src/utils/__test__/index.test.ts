import { add, isEmail } from '..';

describe('utils', () => {
  test('add', () => {
    expect(add(1, 1)).toBe(2);
    expect(add(2, 2)).toBe(4);
  });

  test.skip('isEmail', () => {
    expect(isEmail('milkmidi@gmail.com')).toBeTruthy();
    expect(isEmail('milkmidi+jp@gmail.com')).toBeTruthy(); // validate ?

    expect(isEmail('milkmidi123')).toBeFalsy();
  });
});
