'use client';

import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { Button } from './Button';
import clsx from 'clsx';
import { CloseIcon, LeftChevronIcon } from '@/src/assets/icons';
import { usePathname, useRouter } from '@/src/i18n/routing';

type Props = {
  variant?: 'primary' | 'secondary';
  className?: string;
};

export const BackButton: FunctionComponent<Props> = ({ variant = 'primary', className }) => {
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
          'md:hidden': !isHomePage && variant !== 'secondary',
        },
        className
      ),
    [isHomePage, className, variant]
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
      {variant === 'primary' && <LeftChevronIcon />}
      {variant === 'secondary' && <CloseIcon className="[&>g>path]:!fill-white" />}
    </Button>
  );
};
