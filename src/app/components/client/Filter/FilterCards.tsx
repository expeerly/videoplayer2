'use client';
import { FunctionComponent, memo } from 'react';
import { FilterCard, FilterItemProps } from './FilterCard';

type Props = {
  items: FilterItemProps[];
  pendingFilters: string[];
  onToggle: (name: string) => void;
};

const FilterCardsComponent: FunctionComponent<Props> = ({ items, pendingFilters, onToggle }) => (
  <div className="flex-1 overflow-y-auto md:max-h-[424px]">
    <div className="px-4 h-max overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
      {items.map(item => (
        <FilterCard
          key={item.name}
          name={item.name}
          icon={item.icon}
          logo={item.logo}
          checked={pendingFilters.includes(item.name)}
          onChange={onToggle}
        />
      ))}
    </div>
  </div>
);

export const FilterCards = memo(FilterCardsComponent);
