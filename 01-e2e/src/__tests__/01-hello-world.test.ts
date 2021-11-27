import { test, expect } from '@playwright/test';

test.describe('01-hello-world', () => {
  test('test test test', async ({ page }) => {
    await page.goto(`https://milkmidi.github.io/e2e-test-html/`);
    await page.waitForTimeout(5000);

    expect(page.url().includes(`https://milkmidi.github.io/e2e-test-html/`)).toBeTruthy();
  });
});
