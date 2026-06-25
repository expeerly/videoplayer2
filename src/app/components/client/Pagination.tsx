'use client';

import { FunctionComponent, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import { LeftChevronIcon, RightChevronIcon } from '@/src/assets/icons';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type PaginationProps = {
  totalPages?: number;
  className?: string;
};

export const Pagination: FunctionComponent<PaginationProps> = ({
  totalPages = 50,
  className = '',
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const t = useTranslations();

  const createQueryString = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      return params.toString();
    },
    [searchParams]
  );

  const pageNumbers = useMemo(() => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(1);

    if (showEllipsisStart) {
      pages.push('...');
    }

    // Calculate center pages
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (showEllipsisEnd) {
      pages.push('...');
    }

    // Always show last page
    if (pages[pages.length - 1] !== totalPages) {
      pages.push(totalPages);
    }

    return pages;
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
      if (page >= 1 && page <= totalPages) {
        router.push(`${pathname}?${createQueryString(page)}`);
      }
    },
    [pathname, router, createQueryString, totalPages]
  );

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
          aria-label={t('pagination', { pagenumber: page })}
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
