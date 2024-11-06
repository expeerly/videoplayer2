import clsx from "clsx";
import React, { FunctionComponent } from "react";

export type SlideProps = {
  icon?: JSX.Element | string;
  name?: string;
};

type Props = {
  data: SlideProps;
  className?: string;
};

export const SliderCard: FunctionComponent<Props> = ({ data, className }) => {
  return (
    <button
      className={clsx(
        "flex items-center gap-2 px-8 py-3 rounded-full border border-black  focus:outline-none focus:ring-0 whitespace-nowrap flex-shrink-0",
        className
      )}
    >
      {data?.icon && <span className="text-lg">{data?.icon}</span>}
      {data?.name && (
        <span className="text-sm text-gray-700">{data?.name}</span>
      )}
    </button>
  );
};
