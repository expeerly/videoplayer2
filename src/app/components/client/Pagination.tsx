'use client';

import { FunctionComponent, useMemo, memo, useCallback } from 'react';
import clsx from 'clsx';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
};

const PaginationComponent: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showFirstLast = true,
  maxVisiblePages = 7,
}) => {
  const getPageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const sidePages = Math.floor((maxVisiblePages - 3) / 2);

    if (currentPage <= sidePages + 3) {
      pages.push(...Array.from({ length: maxVisiblePages - 1 }, (_, i) => i + 1));
      pages.push('...', totalPages);
    } else if (currentPage >= totalPages - (sidePages + 2)) {
      pages.push(1, '...');
      pages.push(
        ...Array.from(
          { length: maxVisiblePages - 1 },
          (_, i) => totalPages - (maxVisiblePages - 2) + i
        )
      );
    } else {
      pages.push(1, '...');
      for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
        pages.push(i);
      }
      pages.push('...', totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  const navClassName = useMemo(
    () => clsx('flex items-center justify-center gap-1', className),
    [className]
  );

  const navigationButtonClassName = useMemo(
    () =>
      clsx(
        'p-2 rounded-lg transition-colors',
        'hover:bg-gray-100 disabled:hover:bg-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      ),
    []
  );

  const getPageButtonClassName = useMemo(
    () => (page: number | string) =>
      clsx(
        'w-8 h-8 flex items-center justify-center rounded-full transition-colors',
        'text-sm font-medium',
        {
          'bg-pink-500 text-white': currentPage === page,
          'hover:bg-gray-100': currentPage !== page && page !== '...',
          'cursor-default': page === '...',
          'text-gray-700': page !== '...' && currentPage !== page,
          'text-gray-400': page === '...',
        }
      ),
    [currentPage]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    },
    [onPageChange, totalPages]
  );

  return (
    <nav className={navClassName} aria-label="Pagination">
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={navigationButtonClassName}
          aria-label="Previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {getPageNumbers.map((page, idx) => (
        <button
          key={`${page}-${idx}`}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={page === '...'}
          className={getPageButtonClassName(page)}
          aria-current={currentPage === page ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      {showFirstLast && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={navigationButtonClassName}
          aria-label="Next page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </nav>
  );
};

const Pagination = memo(PaginationComponent);

export default Pagination;
