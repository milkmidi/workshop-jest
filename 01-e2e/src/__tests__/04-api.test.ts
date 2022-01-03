import { test, expect } from '@playwright/test';

test("I'm healthy", async ({ request }) => {
  const result = await request.get(`https://www.positivegrid.com/api/bigcommerce/healthy`);

  const { message } = await result.json();
  expect(result.ok()).toBeTruthy();
  expect(message).toBe("I'm healthy");
});

test('/api/bigcommerce/country', async ({ request }) => {
  const result = await request.get(`https://www.positivegrid.com/api/bigcommerce/country`);
  // TODO
});
