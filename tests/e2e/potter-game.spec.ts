import { test, expect } from '@playwright/test';

test.describe('Potter Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Search for the section title containing the game text (UA)
    const gameSection = page.locator('#games');
    await gameSection.scrollIntoViewIfNeeded();

    // Click "Start Lesson" button
    const startButton = page.getByRole('button', { name: /Почати Урок/i });
    await expect(startButton).toBeInViewport();
    await startButton.click();

    // Wait for the PotterGame container to be visible
    const gameContainer = page.locator('[class*="potterGameContainer"]');
    await expect(gameContainer).toBeVisible({ timeout: 15000 });
  });

  test('game section renders correctly and shows initial state', async ({ page }) => {
    // Verify header text
    await expect(page.getByText('РОЗЧАКЛУЙ СЛОВА')).toBeVisible();

    // Verify there are 8 inputs (from translations potterPuzzles)
    const inputs = page.locator('input[type="text"]');
    await expect(inputs).toHaveCount(8);

    // Verify progress track is empty initially
    const progressFill = page.locator('[class*="snitchProgressFill"]');
    await expect(progressFill).toHaveAttribute('style', 'width: 0%;');
  });

  test('handles correct and incorrect answers', async ({ page }) => {
    const inputs = page.locator('input[type="text"]');

    // First puzzle scrambled is "ІЧКВДІ", answer is "КВІДІЧ"
    const firstInput = inputs.nth(0);

    // Type incorrect answer
    await firstInput.fill('НЕПРАВИЛЬНО');
    // It shouldn't get disabled
    await expect(firstInput).toBeEnabled();

    // Type correct answer
    await firstInput.fill('КВІДІЧ');
    // It should become disabled once correct
    await expect(firstInput).toBeDisabled();

    // Verify focus moved to next input
    const secondInput = inputs.nth(1);
    await expect(secondInput).toBeFocused();

    // Verify progress has increased
    const progressFill = page.locator('[class*="snitchProgressFill"]');
    // The width should be > 0% now. 1/8 * 100 = 12.5%
    await expect(progressFill).toHaveAttribute('style', 'width: 12.5%;');

    // Verify wax seal shows a checkmark for the first solved puzzle (by checking class)
    const firstCard = page.locator('[class*="potterParchmentCard"]').nth(0);
    await expect(firstCard).toHaveClass(/solved/);
  });

  test('completes the game and shows success message', async ({ page }) => {
    test.slow(); // multiple fills + state transitions need extra time in CI

    const inputs = page.locator('input[type="text"]');

    const answers = [
      "КВІДІЧ",
      "МАНТІЯ",
      "ЗІЛЛЯ",
      "ТРОЛЬ",
      "КЛЮЧ",
      "ШАХИ",
      "ЕКСПРЕС",
      "ВАСИЛІСК"
    ];

    // Fill all answers sequentially, waiting for each to be disabled
    for (let i = 0; i < answers.length; i++) {
      await inputs.nth(i).fill(answers[i]);
      await expect(inputs.nth(i)).toBeDisabled({ timeout: 10000 });
    }

    // After all are solved, success message should appear
    await expect(page.getByText('Виграш Гриффіндору!')).toBeVisible({ timeout: 10000 });

    // The progress track should disappear since allFinished is true
    const progressTrack = page.locator('[class*="snitchProgressTrack"]');
    await expect(progressTrack).not.toBeVisible({ timeout: 5000 });
  });
});
