import { Page } from '@playwright/test';

const {
  USERNAME = '',
  PASSWORD = '',
  APP_URL = 'https://localhost:8080/'
} = process.env;

/**
 * 
 * @param page the page function for the current test
 * @description Loads the app URL, fills in the username and password, clicks submit
 * waits for the network to become idle again, and then checks if the todos table
 * header is there.
 */
export async function login(page: Page, username?: string, password?: string) {
  await page.goto(APP_URL);
  await page.waitForLoadState('networkidle');
  await page.getByPlaceholder('bob_rocks89').waitFor({ state: 'visible' });
  await page.getByPlaceholder('bob_rocks89').fill(username || USERNAME);
  await page.getByPlaceholder('(8+)Uppercase').fill(password || PASSWORD);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForLoadState('networkidle');
}

/**
 * 
 * @param page The page function of the current test
 * @description Searches for an item with "Logout" and clicks.
 * 
 */
export async function logout(page: Page) {
  await page.getByText('Logout').click();
}

/**
 * 
 * @param min minimum characters in the string
 * @param max maximum characters in the string
 * @returns a string of at least `min` characters, possibly up to `max` characters.
 * @description Note: the values from this are currently mixed _lowercase_ alphanumeric.
 */
export function genRandomString(min = 8, max = 8) {
  const variance = Math.floor(Math.random() * (max - min));
  return Array.from({ length: min + variance }, () => Math.floor(Math.random() * 36).toString(36)).join('');
}
