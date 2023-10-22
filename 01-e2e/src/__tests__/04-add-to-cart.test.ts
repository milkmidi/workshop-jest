/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect } from '@playwright/test';

test.describe('04-add-to-cart', () => {
  test('add HW0109', async ({ page }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`, { waitUntil: 'networkidle' });
    // Auto waits ------> 超爽
    await page.click('[data-sku="HW0109"] button');

    const baseAmount = await page.innerText('.cart-drawer__base-amount span');
    const HW0109Price = await page.locator('[data-sku="HW0109"]').getAttribute('data-price');
    expect(baseAmount).toBe(HW0109Price);
  });

  test('add HW0109, HW0110', async ({ page, request }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`, { waitUntil: 'networkidle' });

    // TODO２ Server side request
    const productsResponse = await request.get('https://milkmidi.github.io/e2e-test-html/products.json');
    expect(productsResponse.ok()).toBe(true);
    const products = await productsResponse.json();

    await page.click('[data-sku="HW0109"] button');
    await page.click('[data-sku="HW0110"] button');

    const baseAmount = await page.innerText('.cart-drawer__base-amount span');
    const HW0109Price = products.find((product: any) => product.sku === 'HW0109').price;
    const HW0110Price = products.find((product: any) => product.sku === 'HW0110').price;
    const queryAmount = HW0109Price + HW0110Price;
    expect(baseAmount).toBe(`${queryAmount}`);
  });
});
