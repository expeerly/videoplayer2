import React, { FunctionComponent, SVGProps } from "react";

export const ArrowRightIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (
  p
) => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...p}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3431 0.928635L17.7071 7.2926C18.0976 7.68312 18.0976 8.31629 17.7071 8.70681L11.3431 15.0708C10.9526 15.4613 10.3195 15.4613 9.92893 15.0708C9.53841 14.6802 9.53841 14.0471 9.92893 13.6566L14.5858 8.9997H0V6.9997H14.5858L9.92893 2.34285C9.53841 1.95232 9.53841 1.31916 9.92893 0.928635C10.3195 0.538111 10.9526 0.538111 11.3431 0.928635Z"
        fill="#FA0F9C"
      />
    </svg>
  );
};
