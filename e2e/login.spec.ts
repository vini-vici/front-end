import { test } from '@playwright/test';
import { genRandomString, login, logout } from './util';

test.describe('Login', () => {
  // Test that logging in works
  test('Works for a valid user', async ({ page }) => {
    // This is a utility helper that deals with logging in.
    await login(page);
    // Being logged in allows for logout.
    await logout(page);
  });

  // Test that using an invalid username / password doesn't work
  test('Does not work for unregistered users', async ({ page }) => {
    await login(page, genRandomString(8, 12), genRandomString());
    await page.getByText('User does not exist');
  });

});
