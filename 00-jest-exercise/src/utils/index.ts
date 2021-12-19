/* eslint no-useless-escape:0 */

export const add = (a: number, b: number): number => {
  return a + b;
};

// const EMAIL_PATTERN = /^([A-Za-z0-9_\-\.+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

/**
 * 是否為有效的 email
 * @param {string} email
 * @returns {string}
 */
export function isEmail(email: string): boolean {
  // TODO 網請路上亂找一個函式來用
  return false;
  // return !email ? false : EMAIL_PATTERN.test(email);
}
