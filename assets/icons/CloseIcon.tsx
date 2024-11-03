import React, { FunctionComponent, SVGProps } from "react";

export const CloseIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (p) => {
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
        height="22"
        id="mask0_1698_47328"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
        width="22"
        x="0"
        y="0"
      >
        <rect fill="#D9D9D9" height="22" width="22" />
      </mask>
      <g mask="url(#mask0_1698_47328)">
        <path
          d="M5.86683 17.4163L4.5835 16.133L9.71683 10.9997L4.5835 5.86634L5.86683 4.58301L11.0002 9.71634L16.1335 4.58301L17.4168 5.86634L12.2835 10.9997L17.4168 16.133L16.1335 17.4163L11.0002 12.283L5.86683 17.4163Z"
          fill="#0E0E0F"
        />
      </g>
    </svg>
  );
};
