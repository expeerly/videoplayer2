'use client';
import React, { FunctionComponent, memo } from 'react';
import Link from 'next/link';
import { DropDownMenu } from './DropDownMenu';
import { MobileMenu } from './MobileMenu';
import { defaultMenuItems } from './DropDownMenu';
import { Button } from '../server/Button';
import clsx from 'clsx';
import { LeftChevronIcon } from '@/src/assets/icons';
import { usePathname } from '@/src/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const NavbarComponent: FunctionComponent = () => {
  const pathname = usePathname();
  const t = useTranslations('menu');

  return (
    <header className="flex items-center z-[999999999] flex-row w-full bg-white justify-between  py-[15px] px-4 md:py-5 md:px-8 mid-lg:px-12 border-b md:sticky top-0">
      <div className="flex gap-2 items-center">
        <Button
          isOnlyIcon
          variant="secondary"
          className={clsx({
            hidden: pathname === '/',
            ' sm:hidden': pathname !== '/',
          })}
        >
          <LeftChevronIcon />
        </Button>
        <Link
          href={'/'}
          title="expeerly"
          aria-label="logo"
          className={clsx({
            'w-[30px] flex sm:w-max overflow-hidden': pathname !== '/',
          })}
        >
          <Image
            src={'/expeerly-logo.svg'}
            height={35}
            width={113.75}
            alt="Expeerly Logo"
            className={clsx('h-[30px] w-[113.75px] md:h-[35px] flex object-contain', {
              'object-cover object-left md:object-contain': pathname !== '/',
            })}
          />
        </Link>
      </div>
      <div className="hidden md:flex gap-[22px]">
        <div className="flex gap-3">
          <Button href="https://app.expeerly.com/ " className="w-[150px]">
            {t('signUp')}
          </Button>

          <Button
            href="https://app.expeerly.com/?m=signup&user=creator"
            className="w-[150px]"
            variant="outline"
          >
            {t('login')}
          </Button>
        </div>

        <DropDownMenu />
      </div>
      <div className=" md:hidden">
        <MobileMenu menuItems={defaultMenuItems} />
      </div>
    </header>
  );
};

export const Navbar = memo(NavbarComponent);
