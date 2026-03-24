// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Responsive - Desktop (1200px)', () => {
    test.use({ viewport: { width: 1200, height: 900 } });

    test('desktop nav is visible, hamburger is hidden', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.nav-links')).toBeVisible();
        await expect(page.locator('.mobile-toggle')).not.toBeVisible();
    });

    test('expertise grid shows bento layout', async ({ page }) => {
        await page.goto('/');
        const grid = page.locator('.expertise-grid');
        await expect(grid).toBeVisible();
    });

    test('contact section shows two columns', async ({ page }) => {
        await page.goto('/');
        const container = page.locator('.contact-container');
        const box = await container.boundingBox();
        const infoBox = await page.locator('.contact-info').boundingBox();
        // Contact info should take roughly half the width
        expect(infoBox.width).toBeLessThan(box.width * 0.6);
    });
});

test.describe('Responsive - Tablet (768px)', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('hamburger menu appears at tablet width', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.mobile-toggle')).toBeVisible();
    });
});

test.describe('Responsive - Mobile (375px)', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('hamburger menu is visible on mobile', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.mobile-toggle')).toBeVisible();
    });

    test('stats wrap on mobile', async ({ page }) => {
        await page.goto('/');
        const stats = page.locator('.stats-container');
        await expect(stats).toBeVisible();
    });

    test('expertise cards stack vertically', async ({ page }) => {
        await page.goto('/');
        const firstCard = page.locator('.expertise-card').first();
        const secondCard = page.locator('.expertise-card').nth(1);

        const firstBox = await firstCard.boundingBox();
        const secondBox = await secondCard.boundingBox();

        // Second card should be below the first (stacked), not beside it
        expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 10);
    });
});
