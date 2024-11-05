import React, { FunctionComponent, SVGProps } from "react";

export const HeartIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (p) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...p}
    >
      <path
        d="M16.9999 30.2458L14.9458 28.3758C7.64992 21.76 2.83325 17.3825 2.83325 12.0417C2.83325 7.66417 6.26159 4.25 10.6249 4.25C13.0899 4.25 15.4558 5.3975 16.9999 7.19667C18.5441 5.3975 20.9099 4.25 23.3749 4.25C27.7383 4.25 31.1666 7.66417 31.1666 12.0417C31.1666 17.3825 26.3499 21.76 19.0541 28.3758L16.9999 30.2458Z"
        fill="white"
      />
    </svg>
  );
};
