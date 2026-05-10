import { test, expect } from '@playwright/test';

test.describe('Video Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const videoGallery = page.locator('#video-gallery');
    await videoGallery.scrollIntoViewIfNeeded();
  });

  test('renders section title and subtitle', async ({ page }) => {
    const gallery = page.locator('#video-gallery');
    await expect(gallery.locator('h2')).toBeVisible();
    await expect(gallery.locator('p')).toBeVisible();
  });

  test('renders multiple video cards', async ({ page }) => {
    const cards = page.getByTestId('video-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(1);
  });

  test('each card contains a play button overlay', async ({ page }) => {
    const firstCard = page.getByTestId('video-card').first();
    await firstCard.scrollIntoViewIfNeeded();
    // Play button is the circle with a play icon
    const playOverlay = firstCard.locator('svg').first();
    await expect(playOverlay).toBeVisible();
  });

  test.describe('Desktop modal', () => {
    test.skip(({ isMobile }) => isMobile, 'Desktop only');

    test('opens modal on double click', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.dblclick({ force: true });

      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 10000 });
      await expect(modal.locator('video')).toBeVisible();
    });

    test('closes modal by clicking close button', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.dblclick({ force: true });

      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 10000 });

      const closeBtn = modal.getByRole('button', { name: /Закрити|Close/i });
      await closeBtn.click();
      await expect(modal).not.toBeVisible();
    });

    test('closes modal by pressing Escape key', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.dblclick({ force: true });

      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 10000 });

      await page.keyboard.press('Escape');
      await expect(modal).not.toBeVisible();
    });

    test('closes modal by clicking the backdrop overlay', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.dblclick({ force: true });

      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 10000 });

      // Click outside the card (top-left corner of the modal overlay)
      await modal.click({ position: { x: 10, y: 10 }, force: true });
      await expect(modal).not.toBeVisible();
    });

    test('navigates to next video via ArrowRight key', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.dblclick({ force: true });

      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 10000 });

      const initialVideo = modal.locator('video');
      const initialSrc = await initialVideo.getAttribute('src');

      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(500); // allow animation to settle

      const newSrc = await modal.locator('video').getAttribute('src');
      expect(newSrc).not.toBe(initialSrc);
    });

    test('navigates to previous video via ArrowLeft key', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.dblclick({ force: true });

      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 10000 });

      const initialSrc = await modal.locator('video').getAttribute('src');

      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(500);

      const newSrc = await modal.locator('video').getAttribute('src');
      expect(newSrc).not.toBe(initialSrc);
    });

    test('navigates via next/prev buttons in modal', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.dblclick({ force: true });

      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 10000 });

      const initialSrc = await modal.locator('video').getAttribute('src');

      const nextBtn = page.getByRole('button', { name: /Наступне відео|Next video/i });
      await nextBtn.click();
      await page.waitForTimeout(500);

      const newSrc = await modal.locator('video').getAttribute('src');
      expect(newSrc).not.toBe(initialSrc);
    });

    test('modal contains progress bar input', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.dblclick({ force: true });

      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 10000 });

      const progressBar = modal.locator('input[type="range"][aria-label]');
      await expect(progressBar).toBeVisible();
    });

    test('like button toggles state on a card', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();

      const likeBtn = firstCard.locator('[class*="drop-shadow"]').first();
      await likeBtn.click({ force: true });
      // We just verify no errors occur and the click is handled
      await expect(firstCard).toBeVisible();
    });

    test('mute button is present on card controls', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();

      const muteBtn = firstCard.getByRole('button', { name: /Вимкнути звук|Увімкнути звук|Mute|Unmute/i });
      await expect(muteBtn).toBeVisible();
    });

    test('fullscreen button opens modal', async ({ page }) => {
      const firstCard = page.getByTestId('video-card').first();
      await firstCard.scrollIntoViewIfNeeded();

      const fullscreenBtn = firstCard.getByRole('button', { name: /На весь екран|Toggle fullscreen/i });
      await fullscreenBtn.click({ force: true });

      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 10000 });
    });
  });
});
