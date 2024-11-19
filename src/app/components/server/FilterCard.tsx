import clsx from 'clsx';
import Image from 'next/image';
import React, { FunctionComponent } from 'react';

export type FilterCardProps = {
  icon?: string;
  name: string;
  logo?: string;
  checked?: boolean;
  onChange?: (name: string) => void;
};

export const FilterCard: FunctionComponent<FilterCardProps> = ({
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
      className="flex items-center gap-6 py-3 px-6 hover:bg-gray-50 cursor-pointer"
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
          }
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="w-5 h-5 rounded-full text-sm border-gray-300 form-checkbox focus:ring-0 focus:ring-offset-0 text-navy-500 border-none cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-2">
        {icon && icon}
        <span className="text-base text-gray-900">{name}</span>
        {logo && (
          <Image src={logo} alt={`${name} Logo`} className="h-4 ml-1" height={20} width={20} />
        )}
      </div>
    </div>
  );
};
