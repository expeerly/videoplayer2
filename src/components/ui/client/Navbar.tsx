'use client';
import React, { FunctionComponent } from 'react';
import { Logo } from '@/src/assets/Logo';
import Link from 'next/link';
import { DropDownMenu } from '../../../app/[locale]/components/client/DropDownMenu';
import { MobileMenu } from './MobileMenu';
import { defaultMenuItems } from '../../../app/[locale]/components/client/DropDownMenu';
import { Button } from '../server/Button';
import clsx from 'clsx';
import { LeftChevronIcon } from '@/src/assets/icons';
import { usePathname } from '@/src/i18n/routing';

export const Navbar: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center z-[999999999] flex-row w-full bg-white justify-between  py-[15px] px-4 md:py-5 md:px-12 border-b md:sticky top-0">
      <div className="flex gap-2 items-center">
        <Button
          isOnlyIcon
          variant="secondary"
          className={clsx({ hidden: pathname === '/', ' sm:hidden': pathname !== '/' })}
        >
          <LeftChevronIcon />
        </Button>
        <Link
          href={'/'}
          title="logo"
          aria-label="logo"
          className={clsx({ 'max-w-[30px] sm:max-w-max overflow-hidden': pathname !== '/' })}
        >
          <Logo className="h-[30px] w-auto sm:w-auto md:h-[35px]" />
        </Link>
      </div>
      <div className="hidden md:flex gap-[22px]">
        <div className="flex gap-3">
          <Button className="w-[150px]">Sign Up</Button>

          <Button className="w-[150px]" variant="outline">
            Login
          </Button>
        </div>

        <DropDownMenu />
      </div>
      <div className=" md:hidden">
        <MobileMenu menuItems={defaultMenuItems} />
      </div>
    </nav>
  );
};
