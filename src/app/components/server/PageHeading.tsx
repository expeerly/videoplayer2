import clsx from 'clsx';
import React, { FunctionComponent, PropsWithChildren } from 'react';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
  className?: string;
  element?: HeadingElement;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

export const PageHeading: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  className,
  element = 'h1',
  size = 'lg',
}) => {
  const Component = element;

  return (
    <Component
      className={clsx(
        'flex-1 font-extrabold text-gray-700 mb-1 md:mb-3 md:w-full text-wrap',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
};
