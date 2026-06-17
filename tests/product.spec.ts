import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { USERS } from '../utils/testData';

// This hook runs before each test — logs in and lands on Products page
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
});

test.describe('Product Page Tests', () => {

  test('TC006 - Products page should display product list', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.verifyOnProductPage();

    const names = await productPage.getProductNamesText();
    // SauceDemo always has 6 products
    expect(names.length).toBe(6);
  });

  test('TC007 - Sort by Name A to Z should display products in ascending order', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.sortBy('az');
    const names = await productPage.getProductNamesText();

    // Verify names are in ascending alphabetical order
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });

  test('TC008 - Sort by Name Z to A should display products in descending order', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.sortBy('za');
    const names = await productPage.getProductNamesText();

    const sortedNamesDesc = [...names].sort().reverse();
    expect(names).toEqual(sortedNamesDesc);
  });

  test('TC009 - Sort by Price Low to High should order prices ascending', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.sortBy('lohi');
    const prices = await productPage.getProductPricesAsNumbers();

    // Check each price is less than or equal to the next
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('TC010 - Sort by Price High to Low should order prices descending', async ({ page }) => {
    const productPage = new ProductPage(page);

    await productPage.sortBy('hilo');
    const prices = await productPage.getProductPricesAsNumbers();

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

});
