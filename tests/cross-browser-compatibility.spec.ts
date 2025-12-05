// spec: tests/features/registration.feature
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cross-Browser Compatibility', () => {
  test('Cross-Browser Compatibility', async ({ page }) => {
    // Navigate to SpeechPundit registration page for cross-browser testing
    await page.goto('https://enterprise02.speechpundit.com/register');
    
    // Wait for page to load completely
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Complete a valid registration form with all required fields
    await page.getByRole('textbox', { name: 'Student Coach' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Email' }).fill('john.doe@example.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('SecurePass123!');
    await page.getByText('Select Organization').click();
    await page.getByText('TEST Org').click();
    await page.locator('#validationFormik01').nth(4).click();
    await page.getByRole('checkbox', { name: 'I have read and accept the' }).click();

    // Verify all form elements function properly across browsers
    await expect(page.getByRole('textbox', { name: 'Student Coach' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Signup' })).toBeVisible();

    // Verify form values are correctly filled and retained
    await expect(page.getByRole('textbox', { name: 'Student Coach' })).toHaveValue('John');
    await expect(page.locator('#validationFormik01').nth(4)).toBeChecked();
    await expect(page.getByRole('checkbox', { name: 'I have read and accept the' })).toBeChecked();

    // Verify page displays consistently with proper layout and elements
    const pageLayout = await page.evaluate(() => {
      return {
        title: document.title,
        hasForm: document.querySelector('form') ? true : false,
        hasSignupButton: document.querySelector('button') ? true : false,
        textboxCount: document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]').length,
        radioButtonCount: document.querySelectorAll('input[type="radio"]').length,
        checkboxCount: document.querySelectorAll('input[type="checkbox"]').length,
        pageWidth: window.innerWidth,
        pageHeight: window.innerHeight
      };
    });

    expect(pageLayout.title).toContain('SpeechPundit');
    expect(pageLayout.hasForm).toBe(true);
    expect(pageLayout.hasSignupButton).toBe(true);
    expect(pageLayout.textboxCount).toBeGreaterThanOrEqual(4);
    expect(pageLayout.radioButtonCount).toBe(2);
    expect(pageLayout.checkboxCount).toBe(1);
  });
});