import { test, expect } from '@playwright/test';

test.describe('02-my-page.test', () => {
  test('hi, playwright', async ({ page }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`);
    await page.waitForTimeout(3000);

    expect(page.url().includes(`https://milkmidi.github.io/e2e-test-html/`)).toBeTruthy();
  });

  test('check page healthy', async ({ page }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`);

    // TODO wait for selector method 1
    await page.waitForSelector('.healthy');
    // TODO wait for selector method 2
    // await page.waitForFunction(() => document.querySelectorAll('.healthy').length >= 1);
    const healthyEle = await page.locator('.healthy');

    expect(healthyEle).toHaveCount(1);
  });

  test('fetch products.json', async ({ page, request }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`, { waitUntil: 'networkidle' });

    // TODO 1 Evaluating JavaScript in the browser
    const products = await page.evaluate(() => {
      return fetch('/e2e-test-html/products.json').then((res) => res.json());
    });
    expect(products).toBeDefined();
    // TODO２ Server side request
    const productsResponse = await request.get('https://milkmidi.github.io/e2e-test-html/products.json');
    expect(productsResponse.ok()).toBe(true);
    const productsJson = await productsResponse.json();
    expect(productsJson).toBeDefined();
  });
});
