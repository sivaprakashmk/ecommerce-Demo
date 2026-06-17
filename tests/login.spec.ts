import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { USERS, MESSAGES } from '../utils/testData';

test.describe('Login Tests', () => {

  test('TC001 - Valid user should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    // After successful login, user should land on Products page
    await productPage.verifyOnProductPage();
  });

  test('TC002 - Invalid credentials should show error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);

    await loginPage.verifyErrorMessage(MESSAGES.invalidError);
  });

  test('TC003 - Locked-out user should see locked error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(USERS.locked.username, USERS.locked.password);

    await loginPage.verifyErrorMessage(MESSAGES.lockedError);
  });

  test('TC004 - Empty username should show validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('', USERS.standard.password);

    await loginPage.verifyErrorMessage('Username is required');
  });

  test('TC005 - Empty password should show validation error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(USERS.standard.username, '');

    await loginPage.verifyErrorMessage('Password is required');
  });

});
