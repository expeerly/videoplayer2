'use client';

import React, { forwardRef, SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface StyledSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  options: Option[];
  onChange?: (value: string) => void;
}

export const StyledSelect = forwardRef<HTMLSelectElement, StyledSelectProps>(
  ({ label, error, className, options, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event.target.value);
    };

    return (
      <div className="relative w-52">
        {label && <label className="block mb-2 text-sm font-medium text-grey-700">{label}</label>}
        <div className="relative">
          <select
            ref={ref}
            className={`
              block w-full px-4 py-2.5 text-base
              bg-white border rounded-md
              appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
              ${error ? 'border-red-500' : 'border-grey-300'}
              ${className}
            `}
            onChange={handleChange}
            {...props}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="mt-1 text-sm text-pink-500">{error}</p>}
      </div>
    );
  }
);

StyledSelect.displayName = 'StyledSelect';
