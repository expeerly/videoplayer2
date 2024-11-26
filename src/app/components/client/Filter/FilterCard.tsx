'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { FunctionComponent, useCallback, useMemo } from 'react';

export type FilterItemProps = {
  name: string;
  icon?: string;
  logo?: string;
  title?: string;
};

export type FilterCardProps = {
  checked?: boolean;
  onChange?: (name: string) => void;
  isBrand?: boolean;
} & FilterItemProps;

export const FilterCard: FunctionComponent<FilterCardProps> = ({
  icon,
  name,
  logo,
  title,
  checked = false,
  onChange,
  isBrand = false,
}) => {
  const t = useTranslations('dynamic_texts');
  // Event Handlers
  const handleChange = useCallback(() => {
    onChange?.(name);
  }, [onChange, name]);

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!(e.target as HTMLElement).closest('input')) {
        onChange?.(name);
      }
    },
    [onChange, name]
  );

  // Memoized Classes
  const containerClasses = useMemo(
    () =>
      clsx(
        // Layout
        'flex items-center gap-6',
        // Spacing
        'py-3 px-1',
        // Styling
        'rounded-lg',
        'hover:bg-grey-100',
        'cursor-pointer',
        'min-h-14'
      ),
    []
  );

  const checkboxContainerClasses = useMemo(
    () =>
      clsx(
        // Base styles
        'h-[30px] w-[30px]',
        'border rounded-full',
        'flex justify-center items-center',
        'cursor-pointer',
        // State-based styles
        checked ? 'bg-navy-500' : 'bg-white'
      ),
    [checked]
  );

  const checkboxInputClasses = useMemo(
    () =>
      clsx(
        // Dimensions
        'w-5 h-5',
        // Styling
        'rounded-full',
        'text-sm',
        'text-navy-500',
        'border-none',
        'cursor-pointer',
        // Focus states
        'form-checkbox',
        'focus:ring-0',
        'focus:ring-offset-0'
      ),
    []
  );

  const logoImageClasses = useMemo(
    () =>
      clsx(
        // Base styles
        'h-full w-full',
        'object-contain',
        'ml-1',
        // Size variations based on state
        checked ? 'max-w-20 max-h-10' : 'max-w-16 max-h-8'
      ),
    [checked]
  );

  // Memoized aria label
  const ariaLabel = useMemo(
    () =>
      isBrand
        ? t('filters_brand.aria_label', {
            brandname: name ?? title,
          })
        : t('filters_category.aria_label', { categoriesname: name ?? title }),
    [name, title, isBrand, t]
  );

  return (
    <div className={containerClasses} onClick={handleContainerClick} aria-label={ariaLabel}>
      <div className={checkboxContainerClasses}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={checkboxInputClasses}
        />
      </div>

      <div className="flex items-center gap-2">
        {icon && icon}
        <span className="text-base text-grey-700">{name}</span>
        {logo && (
          <Image
            src={logo}
            alt={`${name} Logo`}
            className={logoImageClasses}
            height={20}
            width={20}
          />
        )}
      </div>
    </div>
  );
};
