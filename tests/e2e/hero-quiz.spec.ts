import { test, expect, Page } from '@playwright/test';

/**
 * Clicks an answer option by its visible text content.
 * Options are shuffled on each render, so we cannot rely on position.
 */
async function clickOption(page: Page, text: string) {
  const btn = page.getByRole('button', { name: text, exact: true });
  await btn.waitFor({ state: 'visible' });
  await btn.click();
}

/**
 * Waits for the 1200ms auto-advance + small render buffer.
 */
const ADVANCE_MS = 1300;

test.describe('HeroQuiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('renders the quiz card with both subject tabs', async ({ page }) => {
    // Desktop: "Українська мова", Mobile: "Укр. мова"
    await expect(page.getByRole('button', { name: /Укр/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Математика' })).toBeVisible();
  });

  test('shows the first question and question counter on load', async ({ page }) => {
    // Counter label: "ПИТАННЯ 1 / 5"
    await expect(page.getByText(/ПИТАННЯ/)).toBeVisible();
    await expect(page.getByText('1 / 5')).toBeVisible();

    // First Ukrainian question text
    await expect(page.getByText('Яке слово є іменником? (Хто? Що?)')).toBeVisible();

    // Three answer option buttons
    await expect(page.getByRole('button', { name: 'Бігти', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Веселий', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Школа', exact: true })).toBeVisible();
  });

  test('marks correct answer in green after clicking it', async ({ page }) => {
    // Q1 correct: "Школа" (originalIndex 2)
    await clickOption(page, 'Школа');

    const correctBtn = page.getByRole('button', { name: 'Школа', exact: true });
    await expect(correctBtn).toHaveClass(/border-green-500/);
  });

  test('marks wrong answer in red and reveals correct answer in green', async ({ page }) => {
    // Click a wrong answer for Q1
    await clickOption(page, 'Бігти');

    await expect(page.getByRole('button', { name: 'Бігти', exact: true })).toHaveClass(/border-red-500/);
    await expect(page.getByRole('button', { name: 'Школа', exact: true })).toHaveClass(/border-green-500/);
  });

  test('disables all option buttons after an answer is selected', async ({ page }) => {
    await clickOption(page, 'Школа');

    // All option buttons should now be disabled
    for (const text of ['Бігти', 'Веселий', 'Школа']) {
      await expect(page.getByRole('button', { name: text, exact: true })).toBeDisabled();
    }
  });

  test('auto-advances to next question after 1200ms', async ({ page }) => {
    await clickOption(page, 'Школа');
    await page.waitForTimeout(ADVANCE_MS);

    await expect(page.getByText('2 / 5')).toBeVisible();
    await expect(page.getByText('Антонім до слова «День»?')).toBeVisible();
  });

  test('switching to Math tab resets the quiz and shows math question', async ({ page }) => {
    // Answer Q1 of Ukrainian tab to advance to Q2
    await clickOption(page, 'Школа');
    await page.waitForTimeout(ADVANCE_MS);
    await expect(page.getByText('2 / 5')).toBeVisible();

    // Switch to Math tab
    await page.getByRole('button', { name: 'Математика' }).click();

    // Should reset to Q1 of Math
    await expect(page.getByText('1 / 5')).toBeVisible();
    await expect(page.getByText('Скільки буде 5 + 3?')).toBeVisible();
  });

  test('math tab: correct answer for Q1 is "8"', async ({ page }) => {
    await page.getByRole('button', { name: 'Математика' }).click();

    await expect(page.getByText('Скільки буде 5 + 3?')).toBeVisible();
    await clickOption(page, '8');

    await expect(page.getByRole('button', { name: '8', exact: true })).toHaveClass(/border-green-500/);
  });

  test('completes all 5 Ukrainian questions and shows results screen', async ({ page }) => {
    test.slow(); // 5 × ADVANCE_MS ≈ 6.5s + assertions

    // UA Ukrainian answers in question order (options shuffled, but text is known)
    const answers = ['Школа', 'Ніч', 'Спати', '33', 'Знак питання'];

    for (const answer of answers) {
      await clickOption(page, answer);
      await page.waitForTimeout(ADVANCE_MS);
    }

    // scoreLabel UA: "Ти набрав {score} з {total} балів!" → "Ти набрав 5 з 5 балів!"
    await expect(page.getByText(/Ти набрав 5 з 5 балів/)).toBeVisible({ timeout: 5000 });

    // Result title for perfect score
    await expect(page.getByText('Чудовий результат!')).toBeVisible();

    // Retry button
    await expect(page.getByRole('button', { name: /Спробувати ще/i })).toBeVisible();
  });

  test('retry button resets quiz back to Q1', async ({ page }) => {
    test.slow();

    const answers = ['Школа', 'Ніч', 'Спати', '33', 'Знак питання'];
    for (const answer of answers) {
      await clickOption(page, answer);
      await page.waitForTimeout(ADVANCE_MS);
    }

    await expect(page.getByRole('button', { name: /Спробувати ще/i })).toBeVisible({ timeout: 5000 });
    await page.getByRole('button', { name: /Спробувати ще/i }).click();

    // Back to Q1
    await expect(page.getByText('1 / 5')).toBeVisible();
    await expect(page.getByText('Яке слово є іменником? (Хто? Що?)')).toBeVisible();
  });
});
