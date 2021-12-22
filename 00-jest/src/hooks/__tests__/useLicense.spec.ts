import { renderHook } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import useLicense from '../useLicense';
import PGLicenseOrigin from '../../libs/PGLicense';

jest.mock('../../libs/PGLicense');

const PGLicense = mocked(PGLicenseOrigin, true);

describe('useLicense', () => {
  afterEach(() => {
    // 清空 mock, 不然 toBeCalledTimes 會壘加
    PGLicense.getDeductPrice.mockClear();
  });
  test('should return origin salePrice when not not ready', () => {
    const { result } = renderHook(() => useLicense());

    PGLicense.getDeductPrice.mockReturnValueOnce({
      ready: false,
      deduct: 999,
    });

    expect(result.current.getProductPrice('HW0109', 299)).toBe(299);
    expect(PGLicense.getDeductPrice).toBeCalledTimes(1);
  });

  test('should return correct price when api ready', () => {
    const { result } = renderHook(() => useLicense());

    PGLicense.getDeductPrice.mockReturnValueOnce({
      ready: true,
      deduct: 99,
    });

    expect(result.current.getProductPrice('HW0109', 299)).toBe(200);
    expect(PGLicense.getDeductPrice).toBeCalledTimes(1);
  });
});
