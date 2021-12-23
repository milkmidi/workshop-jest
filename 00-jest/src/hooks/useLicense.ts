import React from 'react';
import PGLicense from '../libs/PGLicense';

export type UseLicense = {
  getProductPrice: (sku: string, originSalePriceUSD: number) => number;
};

export default function useLicense(): UseLicense {
  const getProductPrice = React.useCallback((sku: string, originSalePriceUSD: number) => {
    const { ready, deduct } = PGLicense.getDeductPrice(sku);
    if (!ready) {
      return originSalePriceUSD;
    }
    return originSalePriceUSD - deduct;
  }, []);

  return {
    getProductPrice,
  };
}
