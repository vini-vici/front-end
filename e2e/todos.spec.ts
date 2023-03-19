import { test, expect } from '@playwright/test';
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
    await page.getByPlaceholder('Todo title').fill('Updated');
    await page.getByPlaceholder('Todo description').fill('Updated description');
    await page.getByRole('button', { name: 'Save' }).click();
  });

  test('Deletes a todo', async ({ page }) => {
    await login(page);
    await page.waitForSelector('tbody tr');
    const preLength = await (await page.$$('tbody tr')).length;
    await page.getByTitle('Delete todo').click();
    await page.waitForTimeout(1000);
    const postLength = await (await page.$$('tbody tr')).length;

    expect(postLength).toBeLessThan(preLength);
  });
});