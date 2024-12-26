'use client';

import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { Button } from './Button';
import clsx from 'clsx';
import { LeftChevronIcon } from '@/src/assets/icons';
import { usePathname, useRouter } from '@/src/i18n/routing';

type Props = {
  className?: string;
};

export const BackButton: FunctionComponent<Props> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const goBack = useCallback(() => {
    if (isHomePage) {
      return;
    }

    if (window && window.history.length > 2) {
      router.back();
    } else {
      router.push('/');
    }
  }, [isHomePage, router]);

  const backButtonClasses = useMemo(
    () =>
      clsx(
        {
          hidden: isHomePage,
          'block md:hidden': !isHomePage,
        },
        className
      ),
    [isHomePage, className]
  );

  return (
    <Button
      isOnlyIcon
      variant="secondary"
      className={backButtonClasses}
      size="sm"
      onClick={goBack}
      aria-label="Go back to previous page"
    >
      <LeftChevronIcon />
    </Button>
  );
};
