import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    // Use correct Ukrainian spelling
    await expect(page).toHaveTitle(/Анна Синиціна/);
  });

  test('language switcher changes text', async ({ page }) => {
    await page.goto('/');
    
    // Check UA CTA (link in Hero) - Using href for stability
    const ctaLink = page.locator('a[href="#contact"]').first();
    await expect(ctaLink).toContainText(/Записатись|Записатися/i);

    // Language switcher
    const desktopSwitcher = page.locator('nav').getByRole('button', { name: /EN/i });
    if (await desktopSwitcher.isVisible()) {
      await desktopSwitcher.click();
    } else {
      // Mobile flow: Open menu first
      await page.getByLabel(/меню|menu/i).first().click();
      await page.waitForTimeout(1000);
      await page.getByRole('button', { name: /English/i }).click();
    }

    // Verify EN CTA text (matches "Contact" in Navbar or "Book a Lesson" in Hero)
    await expect(ctaLink).toContainText(/Book a Lesson|Contact/i, { timeout: 15000 });
  });
});
