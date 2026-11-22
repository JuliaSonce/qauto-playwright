import { test, expect } from '@playwright/test';

// Spec: specs/generated-add-car.md (source: specs/add-car.md)
// Locators: Playwright CLI inspection, session hw01
test('guest adds Audi TT to Garage', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Guest log in' }).click();

  await page.getByRole('button', { name: 'Add car' }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByLabel('Brand').selectOption('Audi');
  await dialog.getByLabel('Model').selectOption('TT');
  await dialog.getByRole('spinbutton', { name: 'Mileage' }).fill('12000');
  await dialog.getByRole('button', { name: 'Add', exact: true }).click();

  await expect(page).toHaveURL(/panel\/garage/);
  await expect(page.getByRole('listitem').getByText('Audi TT')).toBeVisible();
});
