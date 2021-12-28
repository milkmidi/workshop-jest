import { foo } from '../foo';

const mockFoo = jest.fn();
jest.mock('../foo', () => {
  return {
    get foo() {
      return mockFoo();
    },
  };
});

describe('foo', () => {
  test('add', () => {
    mockFoo.mockReturnValue(true);
    expect(foo).toBe(true);

    mockFoo.mockReturnValue(false);
    expect(foo).toBe(false);
  });
});
