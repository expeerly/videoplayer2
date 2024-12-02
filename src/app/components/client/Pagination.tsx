'use client';

import { FunctionComponent, useMemo, useCallback, useState } from 'react';
import clsx from 'clsx';
import { LeftChevronIcon, RightChevronIcon } from '@/src/assets/icons';
import { useTranslations } from 'next-intl';

export type PaginationProps = {
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

export const Pagination: FunctionComponent<PaginationProps> = ({
  totalPages = 50,
  onPageChange,
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const t = useTranslations();
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage, '...', totalPages];
  }, [currentPage, totalPages]);

  const navClassName = useMemo(
    () => clsx('flex items-center justify-center gap-1', className),
    [className]
  );

  const navigationButtonClassName = useMemo(
    () =>
      clsx(
        'w-8 h-8  flex items-center justify-center rounded-full transition-colors !text-grey-500',
        'hover:bg-gray-100 disabled:hover:bg-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      ),
    []
  );

  const pageButtonClassName = useMemo(
    () => (page: number | string) =>
      clsx(
        'w-8 h-8 flex items-center justify-center rounded-full transition-colors',
        'text-sm font-medium',
        {
          'bg-pink-500 text-white': currentPage === page,
          'hover:bg-grey-100': currentPage !== page && page !== '...',
          'cursor-default': page === '...',
          'text-grey-700': page !== '...' && currentPage !== page,
          'text-grey-700 ': page === '...',
        }
      ),
    [currentPage]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      if (page >= 1 && page <= totalPages) {
        onPageChange?.(page);
      }
    },
    [onPageChange, totalPages]
  );

  console.log(currentPage < totalPages - 2);

  return (
    <nav className={navClassName} aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(navigationButtonClassName, {
          invisible: currentPage === 1,
        })}
        aria-label={t('back_arrow')}
      >
        <LeftChevronIcon className="[&>path]:stroke-grey-500" />
      </button>

      {pageNumbers.map((page, idx) => (
        <button
          key={`${page}-${idx}`}
          onClick={() => typeof page === 'number' && handlePageChange(page)}
          disabled={page === '...'}
          className={pageButtonClassName(page)}
          aria-current={currentPage === page ? 'page' : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className={clsx(navigationButtonClassName, {
          invisible: currentPage > totalPages - 3,
        })}
        aria-label={t('forward_arrow')}
        disabled={currentPage > totalPages - 3}
      >
        <RightChevronIcon className="[&>path]:stroke-grey-500" />
      </button>
    </nav>
  );
};
