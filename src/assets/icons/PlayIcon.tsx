import { FunctionComponent, SVGProps } from 'react';

export const PlayIcon: FunctionComponent<SVGProps<SVGSVGElement>> = p => {
  return (
    <svg
      width="9"
      height="12"
      viewBox="0 0 9 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...p}
    >
      <path
        d="M0.5 2.49476C0.5 2.00917 0.5 1.76638 0.601245 1.63255C0.689447 1.51595 0.824261 1.4438 0.970199 1.43509C1.13772 1.42509 1.33973 1.55976 1.74376 1.82912L7.00154 5.3343C7.33538 5.55686 7.5023 5.66815 7.56047 5.80841C7.61133 5.93103 7.61133 6.06885 7.56047 6.19148C7.5023 6.33174 7.33538 6.44302 7.00154 6.66558L1.74376 10.1708C1.33973 10.4401 1.13772 10.5748 0.970199 10.5648C0.824261 10.5561 0.689447 10.4839 0.601245 10.3673C0.5 10.2335 0.5 9.99071 0.5 9.50513V2.49476Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
