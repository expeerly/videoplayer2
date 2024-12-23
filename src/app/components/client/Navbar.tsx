'use client';

import React, { FunctionComponent, memo, useCallback, useEffect, useMemo } from 'react';
import { DropDownMenu } from './DropDownMenu';
import clsx from 'clsx';
import { Link, usePathname } from '@/src/i18n/routing';
import Image from 'next/image';
import { BackButton } from './BackButton';
import { useSharedDispatch, useSharedState } from '../../context/reducer';

const NavbarComponent: FunctionComponent = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const dispatch = useSharedDispatch();
  const { userHistory } = useSharedState();

  // Memoized class combinations
  const headerClasses = useMemo(
    () =>
      clsx(
        // Layout
        'flex items-center flex-row w-full justify-between',
        // Positioning
        'z-40 top-0',
        // Spacing
        'py-[15px] px-5 md:py-5 md:px-8 mid-lg:px-12',
        // Styling
        'bg-white border-b',
        // Sticky behavior
        'md:sticky',
        {
          'hidden md:flex':
            pathname.includes('/explore') ||
            pathname.split('/')?.length === 6 ||
            pathname.split('/')?.length === 5,
        }
      ),
    [pathname]
  );

  const logoLinkClasses = useMemo(
    () =>
      clsx({
        'w-[30px] flex md:w-max overflow-hidden': !isHomePage,
      }),
    [isHomePage]
  );

  const logoImageClasses = useMemo(
    () =>
      clsx(
        // Base styles
        'h-[30px] w-[113.75px] md:h-[35px] flex object-contain',
        // Conditional styles
        {
          'object-cover object-left md:object-contain': !isHomePage,
        }
      ),
    [isHomePage]
  );

  const historyHandleChange = useCallback(() => {
    if (
      pathname.includes('/explore') &&
      userHistory[userHistory.length - 1]?.includes('/explore')
    ) {
      return;
    }
    dispatch({ type: 'USER_HISTORY', payload: [...userHistory, pathname] });
  }, [dispatch, pathname, userHistory]);

  useEffect(() => {
    historyHandleChange();
  }, [pathname, historyHandleChange]);

  return (
    <header className={headerClasses}>
      <div className="flex gap-2 items-center">
        <BackButton />
        <Link href="/" title="expeerly" aria-label="logo" className={logoLinkClasses}>
          <Image
            src="/expeerly-logo.svg"
            height={35}
            width={113.75}
            alt="Expeerly Logo"
            className={logoImageClasses}
            priority
          />
        </Link>
      </div>
      <div className="flex">
        <DropDownMenu />
      </div>
    </header>
  );
};

export const Navbar = memo(NavbarComponent);
