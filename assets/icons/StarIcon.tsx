import React, { FunctionComponent, SVGProps } from 'react';

export const StarIcon: FunctionComponent<SVGProps<SVGSVGElement>> = ({ fill, color, ...props }) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.36364 12.8589L13.5324 16L12.1607 10.08L16.7273 6.09684L10.7138 5.58316L8.36364 0L6.01345 5.58316L0 6.09684L4.56655 10.08L3.19491 16L8.36364 12.8589Z"
        fill={fill || 'none'}
        stroke={color || '#FFB800'}
      />
    </svg>
  );
};
