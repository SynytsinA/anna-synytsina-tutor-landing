import { useState, useEffect } from 'react';

export const useImagePreloader = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const preloadImages = async () => {
      const startTime = Date.now();
      const minDelay = 800; // Minimum loading time in ms

      try {
        const promises = imageUrls.map((url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(promises);

        // Ensure minimum delay to avoid "blinking" UI
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minDelay) {
          await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
        }

        if (!isCancelled) {
          setImagesLoaded(true);
        }
      } catch (err) {
        console.error('Failed to preload images', err);

        // Even on error, we wait for minDelay for consistent UX
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minDelay) {
          await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
        }

        if (!isCancelled) {
          setImagesLoaded(true);
        }
      }
    };

    preloadImages();

    return () => {
      isCancelled = true;
    };
  }, [imageUrls]);

  return imagesLoaded;
};
