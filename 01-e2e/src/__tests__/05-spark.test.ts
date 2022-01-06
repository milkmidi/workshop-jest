import { test, expect } from '@playwright/test';

const PG_WEB_URL = 'https://www.positivegrid.com';

test.describe('spark', () => {
  // TODO
  test('should cart drawer has Item when click PDP CTA', async ({ page }) => {
    await page.goto(`${PG_WEB_URL}/spark?utm_source=e2e`);
  });

  // TODO
  test('should redirect to checkout when click Proceed to Checkout', async ({ page }) => {
    await page.goto(`${PG_WEB_URL}/spark?utm_source=e2e`);
  });

  // TODO
  test('spark pearl add to cart', async ({ page }) => {
    await page.goto(`${PG_WEB_URL}/spark-pearl/?utm_source=e2e`);
  });
});
