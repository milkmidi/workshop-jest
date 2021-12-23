import { renderHook } from '@testing-library/react-hooks';
// import { mocked } from 'ts-jest/utils';
import useLicense from '../useLicense';
// import PGLicenseOrigin from '../../libs/PGLicense';

describe.skip('useLicense', () => {
  afterEach(() => {
    // 清空 mock, 不然 toBeCalledTimes 會壘加
    // PGLicense.getDeductPrice.mockClear();
  });
  test('should return origin salePrice when not not ready', () => {
    const { result } = renderHook(() => useLicense());

    // TODO

    expect(result.current.getProductPrice('HW0109', 299)).toBe(299);
  });

  test('should return correct price when api ready', () => {
    const { result } = renderHook(() => useLicense());

    // TODO

    expect(result.current.getProductPrice('HW0109', 299)).toBe(200);
  });
});
