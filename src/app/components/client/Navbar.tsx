'use client';
import React, { FunctionComponent, memo, useCallback } from 'react';
import Link from 'next/link';
import { DropDownMenu } from './DropDownMenu';
import { Button } from '../server/Button';
import clsx from 'clsx';
import { LeftChevronIcon } from '@/src/assets/icons';
import { usePathname, useRouter } from '@/src/i18n/routing';
import Image from 'next/image';

const NavbarComponent: FunctionComponent = () => {
  const pathname = usePathname();
  const router = useRouter();

  const goBack = useCallback(() => {
    if (pathname !== '/') {
      router.back();
    } else {
      router.push('/');
    }
  }, [pathname, router]);

  return (
    <header className="flex items-center z-40 flex-row w-full bg-white justify-between  py-[15px] px-4 md:py-5 md:px-8 mid-lg:px-12 border-b md:sticky top-0">
      <div className="flex gap-2 items-center">
        <Button
          isOnlyIcon
          variant="secondary"
          className={clsx({
            hidden: pathname === '/',
            ' md:hidden': pathname !== '/',
          })}
          size="sm"
          onClick={goBack}
        >
          <LeftChevronIcon />
        </Button>
        <Link
          href={'/'}
          title="expeerly"
          aria-label="logo"
          className={clsx({
            'w-[30px] flex md:w-max overflow-hidden': pathname !== '/',
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
      <div className="flex">
        <DropDownMenu />
      </div>
    </header>
  );
};

export const Navbar = memo(NavbarComponent);
