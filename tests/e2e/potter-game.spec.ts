import { test, expect } from '@playwright/test';

test.describe('Potter Game', () => {
  test('game section renders correctly', async ({ page }) => {
    await page.goto('/');
    
    // Search for the section title containing the game text (UA)
    const gameSection = page.locator('#games');
    await gameSection.scrollIntoViewIfNeeded();

    // Click "Start Lesson" button
    const startButton = page.getByRole('button', { name: /Почати Урок/i });
    await expect(startButton).toBeVisible();
    await startButton.click({ force: true });

    // Now the PotterGame should be visible (using partial class name for CSS Modules)
    const gameContainer = page.locator('[class*="potterGameContainer"]');
    await expect(gameContainer).toBeVisible({ timeout: 15000 });
  });
});
