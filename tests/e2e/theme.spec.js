// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Theme Switching', () => {
    test.beforeEach(async ({ page }) => {
        // Clear localStorage to start fresh
        await page.goto('/');
        await page.evaluate(() => localStorage.removeItem('theme'));
        await page.reload();
    });

    test('theme toggle button is visible', async ({ page }) => {
        const btn = page.locator('.theme-toggle');
        await expect(btn).toBeVisible();
    });

    test('default theme is applied on first visit', async ({ page }) => {
        const html = page.locator('html');
        await expect(html).toHaveAttribute('data-theme', 'default');
    });

    test('clicking toggle cycles through themes', async ({ page }) => {
        const btn = page.locator('.theme-toggle');
        const html = page.locator('html');

        await btn.click();
        await expect(html).toHaveAttribute('data-theme', 'light');

        await btn.click();
        await expect(html).toHaveAttribute('data-theme', 'emerald');

        await btn.click();
        await expect(html).toHaveAttribute('data-theme', 'default');
    });

    test('theme persists across page reloads', async ({ page }) => {
        const btn = page.locator('.theme-toggle');
        await btn.click(); // switch to light

        await page.reload();
        const html = page.locator('html');
        await expect(html).toHaveAttribute('data-theme', 'light');
    });

    test('light theme applies light background', async ({ page }) => {
        const btn = page.locator('.theme-toggle');
        await btn.click(); // switch to light

        const bg = await page.evaluate(() =>
            getComputedStyle(document.body).backgroundColor
        );
        // Should be white (rgb(255, 255, 255)), not the dark default
        expect(bg).not.toBe('rgb(9, 9, 11)');
    });

    test('contact button says Contact Us', async ({ page }) => {
        const btn = page.locator('.btn-contact');
        await expect(btn).toHaveText('Contact Us');
    });
});
