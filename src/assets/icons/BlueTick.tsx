import React, { FunctionComponent, SVGProps } from 'react';

export const BlueTick: FunctionComponent<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="10.2861" cy="10" r="10" fill="#2FEDF9" />
      <path
        d="M8.61947 13.6666L5.28613 10.3333L6.4528 9.16659L8.61947 11.3333L14.1195 5.83325L15.2861 6.99992L8.61947 13.6666Z"
        fill="white"
      />
    </svg>
  );
};
