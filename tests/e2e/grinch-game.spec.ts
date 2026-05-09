import { test, expect } from '@playwright/test';

test.describe('Grinch Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const gameSection = page.locator('#games');
    await gameSection.scrollIntoViewIfNeeded();

    // Switch to Grinch tab
    const grinchTab = page.getByRole('button', { name: /Грінч/i });
    await expect(grinchTab).toBeVisible();
    await grinchTab.click({ force: true });

    // Click "Start Lesson" button
    const startButton = page.getByRole('button', { name: /Почати Урок/i });
    await expect(startButton).toBeVisible();
    await startButton.click({ force: true });

    // Wait for the GrinchGame container
    const gameContainer = page.locator('[class*="grinchGameContainer"]');
    await expect(gameContainer).toBeVisible({ timeout: 15000 });
  });

  test('renders initial state with all 10 toys in the pool', async ({ page }) => {
    // Verify task instruction text
    await expect(page.getByText('Допоможи Грінчу посортувати іграшки!')).toBeVisible();

    // Verify zone labels
    await expect(page.getByText('Парні числа', { exact: true })).toBeVisible();
    await expect(page.getByText('Непарні числа', { exact: true })).toBeVisible();

    // Both drop zones should start empty (no toys inside them)
    const evenZoneToys = page.locator('#zone-even [class*="toyItem"]');
    const oddZoneToys = page.locator('#zone-odd [class*="toyItem"]');
    await expect(evenZoneToys).toHaveCount(0);
    await expect(oddZoneToys).toHaveCount(0);

    // 10 draggable toys in the pool: numbers [1, 8, 10, 9, 3, 7, 4, 6, 2, 5]
    // Use :not(.drop-zone *) is not natively available, so check count after zones are empty
    const pool = page.locator('[class*="numberPool"] [class*="toyItem"]');
    await expect(pool).toHaveCount(10);
  });

  test('drops an even number into the even zone correctly', async ({ page }) => {
    // Number 8 is even — find its toy in the pool
    const toyEight = page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: '8' });
    const evenZone = page.locator('#zone-even');

    await toyEight.dragTo(evenZone);

    // Toy 8 should now appear inside the even zone
    const evenZoneToys = page.locator('#zone-even [class*="toyItem"]');
    await expect(evenZoneToys).toHaveCount(1);

    // Pool should have 9 toys remaining
    const poolToys = page.locator('[class*="numberPool"] [class*="toyItem"]');
    await expect(poolToys).toHaveCount(9);
  });

  test('drops an odd number into the odd zone correctly', async ({ page }) => {
    // Number 9 is odd
    const toyNine = page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: '9' });
    const oddZone = page.locator('#zone-odd');

    await toyNine.dragTo(oddZone);

    const oddZoneToys = page.locator('#zone-odd [class*="toyItem"]');
    await expect(oddZoneToys).toHaveCount(1);

    const poolToys = page.locator('[class*="numberPool"] [class*="toyItem"]');
    await expect(poolToys).toHaveCount(9);
  });

  test('flashes error when dropping even number into odd zone', async ({ page }) => {
    // Number 8 is even — drop it into the ODD zone (wrong)
    const toyEight = page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: '8' });
    const oddZone = page.locator('#zone-odd');

    await toyEight.dragTo(oddZone);

    // The odd zone should flash error (errorFlash class)
    await expect(oddZone).toHaveClass(/errorFlash/);

    // After flash, toy should still remain in the pool
    const poolToys = page.locator('[class*="numberPool"] [class*="toyItem"]');
    await expect(poolToys).toHaveCount(10);
  });

  test('flashes error when dropping odd number into even zone', async ({ page }) => {
    // Number 9 is odd — drop it into the EVEN zone (wrong)
    const toyNine = page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: '9' }).first();
    const evenZone = page.locator('#zone-even');

    await toyNine.dragTo(evenZone);

    await expect(evenZone).toHaveClass(/errorFlash/);

    const poolToys = page.locator('[class*="numberPool"] [class*="toyItem"]');
    await expect(poolToys).toHaveCount(10);
  });

  test('completes the game after sorting all toys correctly', async ({ page }) => {
    // Evens: 8, 10, 4, 6, 2 | Odds: 1, 9, 3, 7, 5
    const evenNumbers = [8, 10, 4, 6, 2];
    const oddNumbers = [1, 9, 3, 7, 5];
    const evenZone = page.locator('#zone-even');
    const oddZone = page.locator('#zone-odd');

    for (const num of evenNumbers) {
      const toy = page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: String(num) });
      await toy.dragTo(evenZone);
    }

    for (const num of oddNumbers) {
      const toy = page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: String(num) });
      await toy.dragTo(oddZone);
    }

    // Pool should be empty and show the "all sorted" message
    const poolEmpty = page.locator('[class*="poolEmpty"]');
    await expect(poolEmpty).toBeVisible();
    await expect(poolEmpty).toContainText('Все розсортовано!');

    // Success badge should appear
    const successBadge = page.locator('[class*="successBadge"]');
    await expect(successBadge).toBeVisible();
    await expect(successBadge).toContainText('Чудова робота!');
  });
});
