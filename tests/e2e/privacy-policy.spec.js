// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Bookards privacy policy page', () => {
    test('renders the privacy policy content at the expected URL', async ({ page }) => {
        await page.goto('/bookards/privacy-policy');

        await expect(page).toHaveTitle(/Bookards Privacy Policy/);
        await expect(page.locator('h1')).toHaveText('Privacy Policy for Bookards');
        await expect(page.locator('.policy-date')).toHaveText('01/05/2026');
        await expect(page.locator('#childrens-privacy')).toContainText('We do not knowingly collect personal information from children');
        await expect(page.locator('#premium-purchase')).toContainText('Google Play Billing');
        await expect(page.locator('#contact-us')).toContainText('bookards@sparkbyte.eu');
    });
});
