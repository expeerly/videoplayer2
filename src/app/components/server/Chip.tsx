import React, { FunctionComponent, PropsWithChildren } from 'react';
import clsx from 'clsx';

type ChipProps = {
  variant?: 'solid' | 'outlined';
  onClick?: () => void;
};

export const Chip: FunctionComponent<PropsWithChildren<ChipProps>> = ({
  variant = 'solid',
  children,
}) => {
  return (
    <div
      className={clsx(
        'px-4 py-1 rounded-lg text-sm font-bold w-max text-nowrap',
        variant === 'solid' && 'bg-black/70 text-white',
        variant === 'outlined' && 'bg-black/70 border border-white text-white'
      )}
    >
      {children}
    </div>
  );
};
