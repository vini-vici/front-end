import { test } from '@playwright/test';
import { login } from './util';

test.describe('Todos', () => {
  test('Creates Todo', async ({ page }) => {
    await login(page);
    await page.getByTitle('Add todo').click();
    await page.getByPlaceholder('Todo title').fill('Create new');
    await page.getByRole('button', { name: 'Submit' }).click();
  });

  test('Modifies a todo', async ({ page }) => {
    await login(page);
    await page.getByTitle('Edit todo').click();
    await page.getByRole('textbox').fill('Updated');
  });
});