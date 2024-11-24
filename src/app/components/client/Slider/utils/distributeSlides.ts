import { SlideProps } from '../SliderCard';

export const distributeSlides = <T extends SlideProps>(slides: T[]): T[][] =>
  Array.from({ length: Math.ceil(slides.length / 10) }, (_, i) =>
    slides.slice(i * 10, (i + 1) * 10)
  );
