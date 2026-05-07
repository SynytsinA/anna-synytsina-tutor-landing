import { test, expect } from '@playwright/test';

test.describe('Video Gallery', () => {
  test('opening the modal (Desktop) or playing inline (Mobile)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find the video gallery section
    const videoGallery = page.locator('#video-gallery');
    await videoGallery.scrollIntoViewIfNeeded();

    // Use the data-testid for the interactive card
    const firstCard = page.getByTestId('video-card').first();
    await firstCard.scrollIntoViewIfNeeded();
    
    const viewport = page.viewportSize();
    const isMobile = viewport ? viewport.width < 768 : false;

    if (isMobile) {
      // On mobile, single click toggles inline play
      await firstCard.click({ force: true });
      await expect(firstCard).toBeVisible();
    } else {
      // On desktop, double click opens the modal
      await firstCard.dblclick({ force: true });

      // Modal should open with data-testid="video-modal"
      const modal = page.getByTestId('video-modal');
      await expect(modal).toBeVisible({ timeout: 15000 });
      
      // Verify there's a video element inside the modal
      await expect(modal.locator('video')).toBeVisible();

      // Verify closing the modal
      const closeBtn = modal.locator('.lucide-x').first();
      await closeBtn.click();
      await expect(modal).not.toBeVisible();
    }
  });
});
