import React, { FC, SVGProps } from "react";

export const DownArrowIcon: FC<SVGProps<SVGSVGElement>> = (p) => {
  return (
    <svg
      width="15"
      height="8"
      viewBox="0 0 15 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...p}
    >
      <path d="M12.9025 0.130928L14.0508 1.28034L7.79242 7.54093C7.69213 7.64185 7.57289 7.72194 7.44153 7.77659C7.31018 7.83124 7.16931 7.85937 7.02704 7.85937C6.88477 7.85937 6.74391 7.83124 6.61255 7.77659C6.4812 7.72194 6.36195 7.64185 6.26167 7.54093L-2.87579e-07 1.28034L1.14833 0.132012L7.02542 6.00801L12.9025 0.130928Z" fill="#0E0E0F" />
    </svg>
  );
};
