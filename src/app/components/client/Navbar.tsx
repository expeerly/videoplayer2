'use client';

import React, { FunctionComponent, memo, useMemo } from 'react';
import Link from 'next/link';
import { DropDownMenu } from './DropDownMenu';
import clsx from 'clsx';
import { usePathname } from '@/src/i18n/routing';
import Image from 'next/image';
import { BackButton } from './BackButton';

const NavbarComponent: FunctionComponent = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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
        'md:sticky'
      ),
    []
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
