import { test, expect } from '@playwright/test';

test.describe('03-checkout', () => {
  test('proceed to checkout', async ({ page }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`, { waitUntil: 'networkidle' });

    await page.click('[data-sku="HW0109"] button');
    await page.click('[data-sku="HW0110"] button');

    await page.click('#proceed-to-checkout');

    await page.waitForSelector('.checkout');
    await page.waitForTimeout(1000);
    await page.waitForFunction(() => {
      return !document.querySelector('.checkout')?.classList.contains('loading');
    });
    // await page.waitForTimeout(3000);
    await page.fill('#checkout__email', 'test@test.com');
    await page.fill('#checkout__password', '123456');
    await page.click('#checkout__submit');
    await page.waitForSelector('.checkout__submit-success');
    expect(await page.innerText('.checkout__submit-success')).toBe('SubmitSuccess');
  });
});
