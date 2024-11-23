'use client';

import React, { FunctionComponent, memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { DropDownMenu } from './DropDownMenu';
import { Button } from './Button';
import clsx from 'clsx';
import { LeftChevronIcon } from '@/src/assets/icons';
import { usePathname, useRouter } from '@/src/i18n/routing';
import Image from 'next/image';

const NavbarComponent: FunctionComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const goBack = useCallback(() => {
    if (!isHomePage) {
      router.back();
    } else {
      router.push('/');
    }
  }, [isHomePage, router]);

  // Memoized class combinations
  const headerClasses = useMemo(
    () =>
      clsx(
        // Layout
        'flex items-center flex-row w-full justify-between',
        // Positioning
        'z-40 top-0',
        // Spacing
        'py-[15px] px-4 md:py-5 md:px-8 mid-lg:px-12',
        // Styling
        'bg-white border-b',
        // Sticky behavior
        'md:sticky'
      ),
    []
  );

  const backButtonClasses = useMemo(
    () =>
      clsx({
        hidden: isHomePage,
        'md:hidden': !isHomePage,
      }),
    [isHomePage]
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

  return (
    <header className={headerClasses}>
      <div className="flex gap-2 items-center">
        <Button
          isOnlyIcon
          variant="secondary"
          className={backButtonClasses}
          size="sm"
          onClick={goBack}
        >
          <LeftChevronIcon />
        </Button>
        <Link href="/" title="expeerly" aria-label="logo" className={logoLinkClasses}>
          <Image
            src="/expeerly-logo.svg"
            height={35}
            width={113.75}
            alt="Expeerly Logo"
            className={logoImageClasses}
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
