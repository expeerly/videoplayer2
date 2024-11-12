import React, { FunctionComponent, SVGProps } from 'react';

export const CartIcon: FunctionComponent<SVGProps<SVGSVGElement>> = p => {
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
      <path d="M15.7,42.2c1.9,0,3.5-1.6,3.5-3.5s-1.6-3.5-3.5-3.5-3.5,1.6-3.5,3.5,1.6,3.5,3.5,3.5Z" />
      <path d="M36.5,42.2c1.9,0,3.5-1.6,3.5-3.5s-1.6-3.5-3.5-3.5-3.5,1.6-3.5,3.5,1.6,3.5,3.5,3.5Z" />
      <path d="M37.6,32.7H14.5c-1,0-1.8-.7-2-1.6l-3.2-16.2s0,0,0,0l-1.1-5.3h-3c-1.1,0-2-.9-2-2s.9-2,2-2h4.6c1,0,1.8.7,2,1.6l1.1,5.3h29.3c.6,0,1.2.3,1.6.8.4.5.5,1.2.3,1.8l-4.6,16.2c-.2.9-1,1.5-1.9,1.5ZM16.1,28.7h20l3.5-12.2H13.7l2.4,12.2Z" />
    </svg>
  );
};
