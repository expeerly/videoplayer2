import { SlideProps } from '../SliderCard';

export const distributeSlides = <T extends SlideProps>(slides: T[], maxRows: number = 3): T[][] => {
  const itemsPerRow = 10;
  const totalRows = Math.min(maxRows, Math.ceil(slides?.length / itemsPerRow));
  return Array.from({ length: totalRows }, (_, i) =>
    slides.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );
};
