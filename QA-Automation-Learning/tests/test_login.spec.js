import { test, expect } from '@playwright/test';

test('login and checkout happy path', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.locator('.inventory_list')).toBeVisible();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart\.html$/);
  await expect(page.locator('.cart_item')).toHaveCount(3);

  await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('Siphelele');
  await page.locator('[data-test="lastName"]').fill('Sodawe');
  await page.locator('[data-test="postalCode"]').fill('7750');
  await page.locator('[data-test="continue"]').click();

  await expect(page).toHaveURL(/checkout-step-two\.html$/);
  await page.locator('[data-test="finish"]').click();

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await expect(page.locator('.complete-text')).toContainText('Your order has been dispatched');
});
