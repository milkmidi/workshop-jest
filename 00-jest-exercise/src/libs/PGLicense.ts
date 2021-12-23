/* eslint-disable dot-notation */

type PGLicense = {
  getDeductPrice(sku: string): {
    ready: boolean;
    deduct: number;
  };
};

let license: PGLicense = window['PGLicense'] as PGLicense;
// for jest test only
// 要 mock module, 一定要有 instance, 不然 jest 會得到 undefined
if (process.env.APP_ENV === 'test') {
  license = {
    getDeductPrice() {
      return {
        ready: true,
        deduct: 9527,
      };
    },
  } as PGLicense;
}
// @ts-ignore
export default license as PGLicense;
