import React, { FunctionComponent, SVGProps } from 'react';

export const FilterIcon: FunctionComponent<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="mask0_2960_20923" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2960_20923)">
        <path
          className="fill-gray-700"
          d="M7 18V16H3V14H7V12H9V18H7ZM11 16V14H21V16H11ZM15 12V6H17V8H21V10H17V12H15ZM3 10V8H13V10H3Z"
        />
      </g>
    </svg>
  );
};
