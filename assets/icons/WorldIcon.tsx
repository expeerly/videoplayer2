import React, { FunctionComponent, SVGProps } from 'react';

export const WorldIcon: FunctionComponent<SVGProps<SVGSVGElement>> = p => {
  return (
    <svg
      fill="none"
      height="28"
      viewBox="0 0 28 28"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
      {...p}
    >
      <path
        d="M14 26C20.6273 26 26 20.6273 26 14C26 7.37273 20.6273 2 14 2M14 26C7.37273 26 2 20.6273 2 14C2 7.37273 7.37273 2 14 2M14 26C17.2727 26 18.3636 20.5455 18.3636 14C18.3636 7.45455 17.2727 2 14 2M14 26C10.7273 26 9.63636 20.5455 9.63636 14C9.63636 7.45455 10.7273 2 14 2M3.09091 18.3636H24.9091M3.09091 9.63636H24.9091"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};
