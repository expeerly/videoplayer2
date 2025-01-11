'use client';
import { FunctionComponent } from 'react';
import { FilterCard, FilterItemProps } from './FilterCard';

type Props = {
  items: FilterItemProps[];
  pendingFilters: string[];
  onToggle: (name: string) => void;
};

export const FilterCards: FunctionComponent<Props> = ({ items, pendingFilters, onToggle }) => (
  <div className="flex-1 overflow-y-auto md:max-h-[424px]">
    <div className="px-4 h-max overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
      {items.map(item => (
        <FilterCard
          key={item.name}
          name={item.name}
          icon={item.icon}
          logo={item.logo}
          checked={pendingFilters.includes(item.id)}
          onChange={onToggle}
          id={item.id}
        />
      ))}
    </div>
  </div>
);
