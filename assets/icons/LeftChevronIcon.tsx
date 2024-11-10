import React, { FunctionComponent, SVGProps } from "react";

export const LeftChevronIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (
  p,
) => {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...p}
    >
      <path
        d="M6.72266 12.4443L1.27821 6.99989L6.72266 1.55545"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};
