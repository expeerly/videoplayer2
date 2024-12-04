import React, { FunctionComponent, SVGProps } from 'react';

export const XIcon: FunctionComponent<SVGProps<SVGSVGElement>> = props => {
  return (
    <svg
      width="27"
      height="26"
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.2812 25.5L16.2847 10.9295L16.3018 10.9432L25.3151 0.5H22.3031L14.9606 9L9.12969 0.5H1.23022L10.563 14.1034L10.5618 14.1023L0.71875 25.5H3.73078L11.894 16.0432L18.3818 25.5H26.2812ZM7.93625 2.77272L21.9621 23.2273H19.5752L5.53803 2.77272H7.93625Z"
        fill="#0E0E0F"
      />
    </svg>
  );
};
