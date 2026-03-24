// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Accessibility', () => {
    test('page has a single h1', async ({ page }) => {
        await page.goto('/');
        const h1s = page.locator('h1');
        await expect(h1s).toHaveCount(1);
    });

    test('all content images have alt text', async ({ page }) => {
        await page.goto('/');
        // Exclude decorative images (aria-hidden, Leaflet tiles/markers)
        const images = page.locator('img:not([aria-hidden="true"]):not(.leaflet-tile):not(.leaflet-marker-icon):not(.leaflet-marker-shadow)');
        const count = await images.count();

        for (let i = 0; i < count; i++) {
            const alt = await images.nth(i).getAttribute('alt');
            expect(alt).toBeTruthy();
        }
    });

    test('mobile toggle has aria-label', async ({ page }) => {
        await page.goto('/');
        const toggle = page.locator('.mobile-toggle');
        await expect(toggle).toHaveAttribute('aria-label', 'Toggle navigation');
    });

    test('mobile toggle has aria-expanded', async ({ page }) => {
        await page.goto('/');
        const toggle = page.locator('.mobile-toggle');
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    test('decorative elements are hidden from screen readers', async ({ page }) => {
        await page.goto('/');
        const orbs = page.locator('.hero-orb');
        const count = await orbs.count();

        for (let i = 0; i < count; i++) {
            await expect(orbs.nth(i)).toHaveAttribute('aria-hidden', 'true');
        }

        const dotGrid = page.locator('.dot-grid');
        await expect(dotGrid).toHaveAttribute('aria-hidden', 'true');
    });

    test('heading hierarchy is logical', async ({ page }) => {
        await page.goto('/');

        // h1 exists
        await expect(page.locator('h1')).toHaveCount(1);

        // h2s exist (section headings)
        const h2s = page.locator('h2');
        expect(await h2s.count()).toBeGreaterThanOrEqual(4);

        // h3s exist (card headings)
        const h3s = page.locator('h3');
        expect(await h3s.count()).toBeGreaterThanOrEqual(5);
    });

    test('links have discernible text', async ({ page }) => {
        await page.goto('/');
        const links = page.locator('a');
        const count = await links.count();

        for (let i = 0; i < count; i++) {
            const link = links.nth(i);
            const text = await link.textContent();
            const ariaLabel = await link.getAttribute('aria-label');
            expect(text.trim() || ariaLabel).toBeTruthy();
        }
    });
});
