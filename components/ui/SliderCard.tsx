import React, { FunctionComponent } from "react";

export type SlideProps = {
  icon?: JSX.Element | string;
  name?: string;
};

export const SliderCard: FunctionComponent<SlideProps> = ({ name, icon }) => {
  return (
    <button className="flex items-center gap-2 px-8 py-3 rounded-full border border-black  focus:outline-none focus:ring-0 whitespace-nowrap flex-shrink-0">
      {icon && <span className="text-lg">{icon}</span>}
      {name && <span className="text-sm text-gray-700">{name}</span>}
    </button>
  );
};
