import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    this.page          = page;
    this.pageTitle     = page.locator('.title');
    this.sortDropdown  = page.locator('[data-test="product-sort-container"]');
    this.productNames  = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async verifyOnProductPage() {
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addProductToCart(productName: string) {
    // Find the product card that contains this name, then click its Add to Cart button
    const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
    await productCard.locator('button').click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNamesText(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getProductPricesAsNumbers(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    // Remove "$" and convert to number for comparison
    return priceTexts.map(p => parseFloat(p.replace('$', '')));
  }
}
