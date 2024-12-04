'use client';

import React, { FunctionComponent, useCallback, useMemo, useEffect, useState } from 'react';
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
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['/']);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Track navigation history
  useEffect(() => {
    setNavigationHistory(prevHistory => {
      if (prevHistory[prevHistory.length - 1] !== pathname) {
        return [...prevHistory, pathname].slice(-10);
      }
      return prevHistory;
    });
  }, [pathname]);

  const goBack = useCallback(() => {
    if (isHomePage) {
      return;
    }

    if (navigationHistory.length > 1) {
      const previousPaths = navigationHistory.slice(0, -1);
      const previousPath = previousPaths[previousPaths.length - 1];

      setNavigationHistory(previousPaths);
      router.push(previousPath);
    } else {
      router.push('/');
    }
  }, [isHomePage, router, navigationHistory]);

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
