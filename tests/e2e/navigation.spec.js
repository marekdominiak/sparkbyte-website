// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('sticky header is visible', async ({ page }) => {
        const header = page.locator('.sticky-header');
        await expect(header).toBeVisible();
    });

    test('brand name links to home', async ({ page }) => {
        const brand = page.locator('.brand-name');
        await expect(brand).toHaveText('SPARKBYTE');
    });

    test('nav links scroll to correct sections', async ({ page }) => {
        const links = [
            { text: 'About', target: '#about' },
            { text: 'Expertise', target: '#expertise' },
            { text: 'Approach', target: '#approach' },
            { text: 'Contact', target: '#contact' },
        ];

        for (const link of links) {
            const anchor = page.locator(`.nav-links a[href="${link.target}"]`);
            await expect(anchor).toBeVisible();
        }
    });

    test('Get in Touch CTA is visible in nav', async ({ page }) => {
        const cta = page.locator('.nav-cta');
        await expect(cta).toBeVisible();
        await expect(cta).toHaveText('Get in Touch');
    });
});

test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('hamburger menu toggles mobile nav', async ({ page }) => {
        await page.goto('/');

        const toggle = page.locator('.mobile-toggle');
        const menu = page.locator('.nav-menu');

        await expect(toggle).toBeVisible();
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');

        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await expect(menu).toHaveClass(/open/);

        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    test('mobile menu closes when a link is clicked', async ({ page }) => {
        await page.goto('/');

        const toggle = page.locator('.mobile-toggle');
        await toggle.click();

        const link = page.locator('.nav-links a').first();
        await link.click();

        const menu = page.locator('.nav-menu');
        await expect(menu).not.toHaveClass(/open/);
    });
});
