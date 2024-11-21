'use client';
import clsx from 'clsx';
import Image from 'next/image';
import React, { FunctionComponent, memo } from 'react';

export type FilterItemProps = {
  name: string;
  icon?: string;
  logo?: string;
};

export type FilterCardProps = {
  checked?: boolean;
  onChange?: (name: string) => void;
} & FilterItemProps;

const FilterCardComponent: FunctionComponent<FilterCardProps> = ({
  icon,
  name,
  logo,
  checked = false,
  onChange,
}) => {
  const handleChange = () => {
    onChange?.(name);
  };

  return (
    <div
      className="flex items-center gap-6 py-3  px-1 rounded-lg hover:bg-grey-100 cursor-pointer min-h-14"
      onClick={e => {
        if (!(e.target as HTMLElement).closest('input')) {
          onChange?.(name);
        }
      }}
    >
      <div
        className={clsx(
          'h-[30px] w-[30px] border rounded-full flex justify-center items-center cursor-pointer',
          {
            'bg-navy-500': checked,
          },
          {
            ' bg-white': !checked,
          }
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="w-5 h-5 rounded-full text-sm form-checkbox focus:ring-0 focus:ring-offset-0 text-navy-500 border-none cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-2">
        {icon && icon}
        <span className="text-base text-grey-700">{name}</span>
        {logo && (
          <Image
            src={logo}
            alt={`${name} Logo`}
            className={clsx(` h-full w-full object-contain ml-1`, {
              'max-w-16 max-h-8': !checked,
              'max-w-20 max-h-10': checked,
            })}
            height={20}
            width={20}
          />
        )}
      </div>
    </div>
  );
};

export const FilterCard = memo(FilterCardComponent);
