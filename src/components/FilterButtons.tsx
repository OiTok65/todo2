import React from 'react';
import { FilterType } from '../types';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  return (
    <div className="filter-buttons">
      <button
        className={`filter-button ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        すべて ({counts.all})
      </button>
      <button
        className={`filter-button ${currentFilter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        未完了 ({counts.active})
      </button>
      <button
        className={`filter-button ${currentFilter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        完了 ({counts.completed})
      </button>
    </div>
  );
};
