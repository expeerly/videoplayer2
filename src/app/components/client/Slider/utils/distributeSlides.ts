import { SlideProps } from '../SliderCard';

export const distributeSlides = <T extends SlideProps>(slides: T[], maxRows: number = 3): T[][] => {
  const slideCount = slides?.length || 0;

  // If we have between 10 and 20 slides, divide into 2 rows
  if (slideCount > 10 && slideCount <= 20) {
    const itemsPerRow = Math.ceil(slideCount / 2);
    return Array.from({ length: 2 }, (_, i) =>
      slides.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
    );
  }

  // For other cases, use the original logic with max 10 items per row
  const itemsPerRow = 10;
  const totalRows = Math.min(maxRows, Math.ceil(slideCount / itemsPerRow));
  return Array.from({ length: totalRows }, (_, i) =>
    slides.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );
};
