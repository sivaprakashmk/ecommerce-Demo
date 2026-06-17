import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page                   = page;
    this.cartIcon               = page.locator('.shopping_cart_link');
    this.cartBadge              = page.locator('.shopping_cart_badge');
    this.cartItems              = page.locator('.cart_item');
    this.checkoutButton         = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async verifyCartItemCount(expectedCount: number) {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  async verifyProductInCart(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
  }

  async removeItemFromCart(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator('button').click();
  }

  async verifyCartIsEmpty() {
    await expect(this.cartBadge).not.toBeVisible();
    await expect(this.cartItems).toHaveCount(0);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
