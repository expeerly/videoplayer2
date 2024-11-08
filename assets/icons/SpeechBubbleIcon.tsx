import React, { FC, FunctionComponent, SVGProps } from "react";

export const SpeechBubbleIcon: FunctionComponent<SVGProps<SVGSVGElement>> = (
  p
) => {
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
        d="M21.6665 6.05869C25.9102 10.1123 26.3309 17.1383 21.5997 20.6763C18.8796 22.7102 24.3058 23.4788 22.8251 23.9443C13.8084 26.7789 8.97945 23.3032 6.16364 20.614C1.91999 16.5604 1.94891 10.016 6.23045 5.99637C10.511 1.97773 17.4219 2.00416 21.6665 6.05869Z"
        fill="currentColor"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
};
