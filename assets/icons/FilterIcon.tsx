import React, { FunctionComponent, SVGProps } from "react";

export const FilterIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (
  props,
) => {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        height="24"
        id="mask0_2960_20923"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
        width="24"
        x="0"
        y="0"
      >
        <rect fill="#D9D9D9" height="24" width="24" />
      </mask>
      <g mask="url(#mask0_2960_20923)">
        <path
          d="M7 18V16H3V14H7V12H9V18H7ZM11 16V14H21V16H11ZM15 12V6H17V8H21V10H17V12H15ZM3 10V8H13V10H3Z"
          fill="#0E0E0F"
        />
      </g>
    </svg>
  );
};
