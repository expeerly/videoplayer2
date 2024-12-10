import React, { FunctionComponent, SVGProps } from 'react';

export const StreamlineBracketIcon: FunctionComponent<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1698_47367)">
        <path
          d="M9.64282 24L1.64282 16L9.64282 8M23.3571 24L31.3571 16L23.3571 8"
          stroke="black"
          strokeWidth="2.28571"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1698_47367">
          <rect width="32" height="32" fill="white" transform="translate(0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
};
