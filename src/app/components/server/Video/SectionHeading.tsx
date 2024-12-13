import React, { FunctionComponent, PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export const SectionHeading: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return <h2 className={`font-extrabold text-grey-700 ${className}`}>{children}</h2>;
};
