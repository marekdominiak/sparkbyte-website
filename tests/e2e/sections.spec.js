// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Page Sections', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('hero section has correct content', async ({ page }) => {
        await expect(page.locator('.hero-label')).toContainText('B2B Software Consultancy');
        await expect(page.locator('.hero-headline')).toContainText('scales your business');
        await expect(page.locator('.hero-sub')).toContainText('10 senior engineers');
        await expect(page.locator('.hero-ctas .btn-primary')).toBeVisible();
        await expect(page.locator('.hero-ctas .btn-ghost')).toBeVisible();
    });

    test('stats bar shows 4 stats', async ({ page }) => {
        const stats = page.locator('.stat');
        await expect(stats).toHaveCount(4);
    });

    test('expertise section has 6 cards', async ({ page }) => {
        const cards = page.locator('.expertise-card');
        await expect(cards).toHaveCount(6);
    });

    test('expertise cards have correct titles', async ({ page }) => {
        const titles = [
            'Backend Engineering',
            'DevOps & Cloud',
            'AI & R&D',
            'Mobile Applications',
            'Quality Assurance',
            'Frontend Engineering',
        ];

        for (const title of titles) {
            await expect(page.locator('.expertise-card h3', { hasText: title })).toBeVisible();
        }
    });

    test('approach section has 4 methodology cards', async ({ page }) => {
        const cards = page.locator('.approach-card');
        await expect(cards).toHaveCount(4);
    });

    test('about section mentions the team', async ({ page }) => {
        const about = page.locator('.about-content');
        await expect(about).toContainText('Marek Dominiak');
        await expect(about).toContainText('EU');
        await expect(about).toContainText('Scandinavia');
        await expect(about).toContainText('10+');
    });

    test('contact section has Paphos address', async ({ page }) => {
        const contact = page.locator('.contact-section');
        await expect(contact).toContainText('Georgiou Griva Digeni');
        await expect(contact).toContainText('Paphos');
        await expect(contact).toContainText('office@sparkbyte.eu');
    });

    test('footer has copyright with current year', async ({ page }) => {
        const year = new Date().getFullYear().toString();
        const footer = page.locator('.footer');
        await expect(footer).toContainText(year);
        await expect(footer).toContainText('Sparkbyte Solutions Ltd');
    });
});
