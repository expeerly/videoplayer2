'use client';

import clsx from 'clsx';
import Image from 'next/image';
import React, { FunctionComponent, useMemo } from 'react';

export type SlideProps = {
  icon?: JSX.Element | string;
  name?: string;
  imgURL?: string;
  id?: number | string;
};

type Props = {
  data: SlideProps;
  className?: string;
};

export const SliderCard: FunctionComponent<Props> = ({ data, className }) => {
  // Memoized aria label
  const ariaLabel = useMemo(() => data?.name ?? `slide-${data?.id}`, [data?.name, data?.id]);

  // Memoized class combinations
  const buttonClasses = useMemo(
    () =>
      clsx(
        // Base styles
        'h-[50px] w-max',
        'flex items-center justify-center gap-2',
        'rounded-full',
        'border border-black',
        'whitespace-nowrap flex-shrink-0',

        // Focus states
        'focus:outline-none focus:ring-0',

        // Padding variations
        'px-6 md:px-8',
        {
          'py-3': !data.imgURL,
        },

        // Custom classes
        className
      ),
    [data.imgURL, className]
  );

  // Memoized image classes
  const imageClasses = useMemo(() => clsx('w-full', 'h-max', 'min-w-max'), []);

  // Memoized text classes
  const textClasses = useMemo(() => clsx('text-base', 'text-grey-700'), []);

  // Memoized icon classes
  const iconClasses = useMemo(() => clsx('text-lg'), []);

  return (
    <button className={buttonClasses} aria-label={ariaLabel}>
      {data?.icon && <span className={iconClasses}>{data.icon}</span>}

      {data?.name && <span className={textClasses}>{data.name}</span>}

      {data.imgURL && (
        <Image className={imageClasses} src={data.imgURL} width={100} height={25} alt={ariaLabel} />
      )}
    </button>
  );
};
