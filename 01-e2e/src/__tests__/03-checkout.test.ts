import { test, expect } from '@playwright/test';

test.describe('03-checkout', () => {
  test('proceed to checkout', async ({ page }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`, { waitUntil: 'networkidle' });
    await page.click('[data-sku="HW0109"] button');
    await page.click('[data-sku="HW0110"] button');

    const baseAmount = await page.innerText('.cart-drawer__base-amount span');
    const HW0109Price = (await page.locator('[data-sku="HW0109"]').getAttribute('data-price')) as string;
    const HW0110Price = (await page.locator('[data-sku="HW0110"]').getAttribute('data-price')) as string;
    const queryAmount = parseInt(HW0109Price, 10) + parseInt(HW0110Price, 10);
    expect(baseAmount).toBe(`${queryAmount}`);

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
