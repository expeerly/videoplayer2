import React, { FunctionComponent } from 'react';

type Props = {
  className?: string;
};

export const Divider: FunctionComponent<Props> = ({ className }) => {
  return <hr className={`w-full border-[#D9D9D9] ${className}`} />;
};
