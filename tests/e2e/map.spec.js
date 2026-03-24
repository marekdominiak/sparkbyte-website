// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Leaflet Map', () => {
    test('map container renders', async ({ page }) => {
        await page.goto('/');
        const map = page.locator('#map');
        await expect(map).toBeVisible();

        // Leaflet adds the .leaflet-container class when initialized
        await expect(map).toHaveClass(/leaflet-container/);
    });

    test('map has a marker with Paphos address', async ({ page }) => {
        await page.goto('/');

        // Leaflet marker is present
        const marker = page.locator('.leaflet-marker-icon');
        await expect(marker).toBeVisible();

        // Popup contains Paphos address
        const popup = page.locator('.leaflet-popup-content');
        await expect(popup).toContainText('Sparkbyte Solutions');
        await expect(popup).toContainText('Georgiou Griva Digeni');
        await expect(popup).toContainText('Paphos');
    });

    test('map tiles load', async ({ page }) => {
        await page.goto('/');

        // Wait for at least one tile image to load
        const tile = page.locator('.leaflet-tile-loaded').first();
        await expect(tile).toBeVisible({ timeout: 10000 });
    });
});
