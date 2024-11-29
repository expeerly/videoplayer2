'use client';

import React, { FunctionComponent, useCallback, useMemo, useEffect, useState } from 'react';
import { Button } from './Button';
import clsx from 'clsx';
import { LeftChevronIcon } from '@/src/assets/icons';
import { usePathname, useRouter } from '@/src/i18n/routing';

export const BackButton: FunctionComponent = () => {
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
      clsx({
        hidden: isHomePage,
        'md:hidden': !isHomePage,
      }),
    [isHomePage]
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
