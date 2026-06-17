import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { USERS, PRODUCTS, CHECKOUT_INFO, MESSAGES } from '../utils/testData';

test.describe('Checkout Tests - End to End', () => {

  test('TC015 - Complete end-to-end purchase flow', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    // Step 2: Add product to cart
    const productPage = new ProductPage(page);
    await productPage.addProductToCart(PRODUCTS.backpack);
    await productPage.addProductToCart(PRODUCTS.bikeLight);

    // Step 3: Go to cart and verify
    const cartPage = new CartPage(page);
    await cartPage.goToCart();
    await cartPage.verifyProductInCart(PRODUCTS.backpack);
    await cartPage.verifyProductInCart(PRODUCTS.bikeLight);

    // Step 4: Proceed to checkout
    await cartPage.proceedToCheckout();

    // Step 5: Fill shipping info and complete order
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    // Step 6: Verify order confirmation
    await checkoutPage.verifyOrderConfirmation(MESSAGES.orderConfirm);
  });

  test('TC016 - Checkout without filling form should not proceed', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    const productPage = new ProductPage(page);
    await productPage.addProductToCart(PRODUCTS.boltTShirt);

    const cartPage = new CartPage(page);
    await cartPage.goToCart();
    await cartPage.proceedToCheckout();

    // Try to continue without filling form
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickContinue();

    // Should show error — first name is required
    const errorMsg = page.locator('[data-test="error"]');
    await errorMsg.waitFor({ state: 'visible' });
  });

});
