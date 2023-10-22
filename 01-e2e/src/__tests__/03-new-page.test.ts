import { test, expect } from '@playwright/test';

test.describe('03-new-page', () => {
  test('園泰世華銀行', async ({ page, context }) => {
    await page.goto(`https://www.cathaybk.com.tw/cathaybk/promo/event/loan/product/personalloan/index.html`);

    // 因為是另開，所以寫法不同
    // https://playwright.dev/docs/pages#handling-new-pages
    const pagePromise = context.waitForEvent('page');
    await page.click('#btn_h04');

    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    console.log(await newPage.title());

    expect(newPage.url().includes('https://cathaybk.com.tw/cathaybk/Apply/loan/LoanApply/intro-s0.aspx?')).toBeTruthy();
  });
});
