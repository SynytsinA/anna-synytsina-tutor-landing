import { test, expect, Page, Locator } from '@playwright/test';

/**
 * Cross-browser pointer drag using page.evaluate with stubbed pointer capture APIs.
 * Firefox/WebKit reject synthetic PointerEvents in setPointerCapture, so we stub them.
 */
async function pointerDrag(page: Page, source: Locator, target: Locator) {
  await source.waitFor({ state: 'visible' });
  await target.waitFor({ state: 'visible' });

  const srcBox = await source.boundingBox();
  const tgtBox = await target.boundingBox();
  if (!srcBox || !tgtBox) throw new Error('Could not get bounding boxes');

  const startX = srcBox.x + srcBox.width / 2;
  const startY = srcBox.y + srcBox.height / 2;
  const endX = tgtBox.x + tgtBox.width / 2;
  const endY = tgtBox.y + tgtBox.height / 2;

  await page.evaluate(({ startX, startY, endX, endY }) => {
    const proto = HTMLElement.prototype;
    const origSet = proto.setPointerCapture;
    const origRelease = proto.releasePointerCapture;
    const origHas = proto.hasPointerCapture;

    // Stub pointer capture APIs — Firefox/WebKit throw InvalidPointerId for synthetic events
    proto.setPointerCapture = () => {};
    proto.releasePointerCapture = () => {};
    proto.hasPointerCapture = () => true;

    const el = document.elementFromPoint(startX, startY);
    const toy = (el?.closest('[class*="toyItem"]') || el) as HTMLElement | null;

    if (toy) {
      const opts: PointerEventInit = {
        bubbles: true, cancelable: true,
        pointerId: 1, button: 0, pointerType: 'mouse', isPrimary: true,
      };
      toy.dispatchEvent(new PointerEvent('pointerdown', { ...opts, clientX: startX, clientY: startY }));
      for (let i = 1; i <= 12; i++) {
        toy.dispatchEvent(new PointerEvent('pointermove', {
          ...opts,
          clientX: startX + (endX - startX) * i / 12,
          clientY: startY + (endY - startY) * i / 12,
        }));
      }
      toy.dispatchEvent(new PointerEvent('pointerup', { ...opts, clientX: endX, clientY: endY }));
    }

    proto.setPointerCapture = origSet;
    proto.releasePointerCapture = origRelease;
    proto.hasPointerCapture = origHas;
  }, { startX, startY, endX, endY });
}

test.describe('Grinch Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const gameSection = page.locator('#games');
    await gameSection.scrollIntoViewIfNeeded();

    const grinchTab = page.getByRole('button', { name: /Грінч/i });
    await expect(grinchTab).toBeVisible();
    await grinchTab.click({ force: true });

    const startButton = page.getByRole('button', { name: /Почати Урок/i });
    await expect(startButton).toBeVisible();
    await startButton.click({ force: true });

    const gameContainer = page.locator('[class*="grinchGameContainer"]');
    await expect(gameContainer).toBeVisible({ timeout: 20000 });
  });

  test('renders initial state with all 10 toys in the pool', async ({ page }) => {
    await expect(page.getByText('Допоможи Грінчу посортувати іграшки!')).toBeVisible();
    await expect(page.getByText('Парні числа', { exact: true })).toBeVisible();
    await expect(page.getByText('Непарні числа', { exact: true })).toBeVisible();
    await expect(page.locator('#zone-even [class*="toyItem"]')).toHaveCount(0);
    await expect(page.locator('#zone-odd [class*="toyItem"]')).toHaveCount(0);
    await expect(page.locator('[class*="numberPool"] [class*="toyItem"]')).toHaveCount(10);
  });

  test('drops an even number into the even zone correctly', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Pointer drag not supported on mobile emulation');
    test.slow();
    await pointerDrag(
      page,
      page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: '8' }),
      page.locator('#zone-even'),
    );
    await expect(page.locator('#zone-even [class*="toyItem"]')).toHaveCount(1);
    await expect(page.locator('[class*="numberPool"] [class*="toyItem"]')).toHaveCount(9);
  });

  test('drops an odd number into the odd zone correctly', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Pointer drag not supported on mobile emulation');
    test.slow();
    await pointerDrag(
      page,
      page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: '9' }).first(),
      page.locator('#zone-odd'),
    );
    await expect(page.locator('#zone-odd [class*="toyItem"]')).toHaveCount(1);
    await expect(page.locator('[class*="numberPool"] [class*="toyItem"]')).toHaveCount(9);
  });

  test('flashes error when dropping even number into odd zone', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Pointer drag not supported on mobile emulation');
    test.slow();
    const oddZone = page.locator('#zone-odd');
    await pointerDrag(
      page,
      page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: '8' }),
      oddZone,
    );
    // errorFlash lasts 600ms — poll immediately after drop
    await expect(oddZone).toHaveClass(/errorFlash/, { timeout: 1000 });
    await expect(page.locator('[class*="numberPool"] [class*="toyItem"]')).toHaveCount(10);
  });

  test('flashes error when dropping odd number into even zone', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Pointer drag not supported on mobile emulation');
    test.slow();
    const evenZone = page.locator('#zone-even');
    await pointerDrag(
      page,
      page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: '9' }).first(),
      evenZone,
    );
    await expect(evenZone).toHaveClass(/errorFlash/, { timeout: 1000 });
    await expect(page.locator('[class*="numberPool"] [class*="toyItem"]')).toHaveCount(10);
  });

  test('completes the game after sorting all toys correctly', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Pointer drag not supported on mobile emulation');
    test.slow();
    const evenZone = page.locator('#zone-even');
    const oddZone = page.locator('#zone-odd');

    for (const num of [8, 10, 4, 6, 2]) {
      await pointerDrag(
        page,
        page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: String(num) }).first(),
        evenZone,
      );
    }
    for (const num of [1, 9, 3, 7, 5]) {
      await pointerDrag(
        page,
        page.locator('[class*="numberPool"] [class*="toyItem"]').filter({ hasText: String(num) }).first(),
        oddZone,
      );
    }

    await expect(page.locator('[class*="poolEmpty"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[class*="poolEmpty"]')).toContainText('Все розсортовано!');
    await expect(page.locator('[class*="successBadge"]')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('[class*="successBadge"]')).toContainText('Чудова робота!');
  });
});
