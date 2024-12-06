import React, { FunctionComponent, PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export const SectionHeading: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <h2 className={`text-lg font-extrabold md:font-medium md:text-2xl text-[#080218] ${className}`}>
      {children}
    </h2>
  );
};
