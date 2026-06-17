import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { USERS, PRODUCTS } from '../utils/testData';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
});

test.describe('Cart Tests', () => {

  test('TC011 - Adding one product should update cart badge to 1', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addProductToCart(PRODUCTS.backpack);
    await cartPage.verifyCartItemCount(1);
  });

  test('TC012 - Adding two products should update cart badge to 2', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addProductToCart(PRODUCTS.backpack);
    await productPage.addProductToCart(PRODUCTS.bikeLight);
    await cartPage.verifyCartItemCount(2);
  });

  test('TC013 - Added product should appear inside cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addProductToCart(PRODUCTS.backpack);
    await cartPage.goToCart();
    await cartPage.verifyProductInCart(PRODUCTS.backpack);
  });

  test('TC014 - Removing product from cart should clear cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addProductToCart(PRODUCTS.bikeLight);
    await cartPage.goToCart();
    await cartPage.removeItemFromCart(PRODUCTS.bikeLight);
    await cartPage.verifyCartIsEmpty();
  });

});
