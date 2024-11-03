import React, { FunctionComponent, SVGProps } from "react";

export const ShareIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (p) => {
  return (
    <svg
      fill="none"
      height="34"
      viewBox="0 0 34 34"
      width="34"
      xmlns="http://www.w3.org/2000/svg"
      {...p}
    >
      <path
        d="M26 16L19 9V13C12 14 9 19 8 24C10.5 20.5 14 18.9 19 18.9V23L26 16Z"
        fill="white"
      />
    </svg>
  );
};
