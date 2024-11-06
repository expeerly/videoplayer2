import React, { FC, SVGProps } from "react";

export const RightArrowIcon: FC<SVGProps<SVGSVGElement>> = (p) => {
  return (
    <svg
      width="8"
      height="14"
      {...p}
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.27783 1.55566L6.72228 7.00011L1.27783 12.4446"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};
