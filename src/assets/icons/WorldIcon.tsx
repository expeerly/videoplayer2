import React, { FunctionComponent, SVGProps } from 'react';

export const WorldIcon: FunctionComponent<SVGProps<SVGSVGElement>> = p => {
  return (
    <svg
      height={28}
      width={28}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 50 50"
      {...p}
    >
      <path
        fill="none"
        stroke="#000"
        strokeWidth={3.5}
        d="M25,43c10,0,18-8.1,18-18S35,7,25,7M25,43c-10,0-18-8.1-18-18S15,7,25,7M25,43c4.9,0,6.6-8.2,6.6-18s-1.6-18-6.6-18M25,43c-4.9,0-6.6-8.2-6.6-18s1.6-18,6.6-18M8.6,31.6h32.8M8.6,18.4h32.8"
      />
    </svg>
  );
};
