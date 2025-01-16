'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { FunctionComponent, useMemo } from 'react';
import { Link } from '@/src/i18n/routing';

export type SlideProps = {
  icon?: string;
  name?: string;
  imgURL?: string;
  id?: number | string;
  title?: string;
  slug: string;
};

type Props = {
  data: SlideProps;
  className?: string;
  isBrand?: boolean;
};

export const SliderCard: FunctionComponent<Props> = ({ data, className, isBrand = false }) => {
  const t = useTranslations('dynamic_texts');

  // Memoized aria label
  const ariaLabel = useMemo(
    () =>
      isBrand
        ? t('home_brand_icons.aria_label', {
            brandname: data?.name ?? data?.title,
          })
        : t('home_category_icons.aria_label', { brandname: data?.name ?? data?.title }),
    [data, isBrand, t]
  );

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
  const imageClasses = useMemo(() => clsx('w-full object-cover', 'h-10', 'w-full'), []);

  // Memoized text classes
  const textClasses = useMemo(() => clsx('text-base', 'text-grey-700'), []);

  // Memoized icon classes
  const iconClasses = useMemo(() => clsx('text-lg'), []);

  const imageUrl = useMemo(
    () => (data.imgURL?.startsWith('http') ? data.imgURL : `https:${data.imgURL}`),
    [data.imgURL]
  );

  return (
    <Link
      href={
        isBrand
          ? `/video-reviews/brand/${data.slug}`
          : `/video-reviews/productcategory/${data.slug}`
      }
      className={buttonClasses}
      aria-label={ariaLabel}
    >
      {data?.icon && (
        <span className={iconClasses}>
          {<Image src={data.icon} alt={ariaLabel} width={25} height={25} />}
        </span>
      )}

      {data?.name && <span className={textClasses}>{data.name}</span>}

      {data.imgURL && (
        <Image className={imageClasses} src={imageUrl} width={100} height={25} alt={ariaLabel} />
      )}
    </Link>
  );
};
