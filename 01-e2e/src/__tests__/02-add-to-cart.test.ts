import { test, expect } from '@playwright/test';

test.describe('02-add-to-cart', () => {
  test('add HW0109', async ({ page }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`, { waitUntil: 'networkidle' });
    await page.click('[data-sku="HW0109"] button');

    const baseAmount = await page.innerText('.cart-drawer__base-amount span');
    const HW0109Price = await page.locator('[data-sku="HW0109"]').getAttribute('data-price');
    expect(baseAmount).toBe(HW0109Price);
  });

  test('add HW0109, HW0110', async ({ page }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`, { waitUntil: 'networkidle' });
    await page.click('[data-sku="HW0109"] button');
    await page.click('[data-sku="HW0110"] button');

    const baseAmount = await page.innerText('.cart-drawer__base-amount span');
    const HW0109Price = (await page.locator('[data-sku="HW0109"]').getAttribute('data-price')) as string;
    const HW0110Price = (await page.locator('[data-sku="HW0110"]').getAttribute('data-price')) as string;
    const queryAmount = parseInt(HW0109Price, 10) + parseInt(HW0110Price, 10);
    expect(baseAmount).toBe(`${queryAmount}`);
  });
});
