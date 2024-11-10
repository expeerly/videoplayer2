import React, { FunctionComponent, SVGProps } from 'react';

export const CartIcon: FunctionComponent<SVGProps<SVGSVGElement>> = p => {
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
        d="M8.95049 26.1666C10.23 26.1666 11.2672 25.1294 11.2672 23.8499C11.2672 22.5704 10.23 21.5332 8.95049 21.5332C7.67101 21.5332 6.63379 22.5704 6.63379 23.8499C6.63379 25.1294 7.67101 26.1666 8.95049 26.1666Z"
        fill="black"
      />
      <path
        d="M22.8499 26.1666C24.1294 26.1666 25.1666 25.1294 25.1666 23.8499C25.1666 22.5704 24.1294 21.5332 22.8499 21.5332C21.5704 21.5332 20.5332 22.5704 20.5332 23.8499C20.5332 25.1294 21.5704 26.1666 22.8499 26.1666Z"
        fill="black"
      />
      <path
        d="M2 3H5.08893L6.01561 7.6334M6.01561 7.6334L8.17786 18.4447H23.6225L26.7115 7.6334H6.01561Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
};
