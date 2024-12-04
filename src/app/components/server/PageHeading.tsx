import clsx from 'clsx';
import React, { FunctionComponent, PropsWithChildren } from 'react';

type Props = {
  className?: string;
};

export const PageHeading: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <h1
      className={clsx(
        'flex-1 text-lg font-extrabold text-grey-700 mb-1 md:mb-3 md:w-full md:text-2xl text-wrap',
        className
      )}
    >
      {children}
    </h1>
  );
};
