import React, { FunctionComponent, SVGProps } from 'react';

export const MenuIcon: FunctionComponent<SVGProps<SVGSVGElement>> = p => {
  return (
    <svg
      fill="none"
      height="22"
      viewBox="0 0 22 22"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
      {...p}
    >
      <mask
        className=""
        height="22"
        width="22"
        x="0"
        y="0"
        id="mask0_1698_48100"
        maskUnits="userSpaceOnUse"
      >
        <rect fill="#D9D9D9" height="22" width="22" />
      </mask>
      <g mask="url(#mask0_1698_48100)">
        <path
          className="fill-grey-700"
          d="M2.75 16.5V14.6667H19.25V16.5H2.75ZM2.75 11.9167V10.0833H19.25V11.9167H2.75ZM2.75 7.33333V5.5H19.25V7.33333H2.75Z"
        />
      </g>
    </svg>
  );
};
