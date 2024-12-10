'use client';
import React, { FunctionComponent, useMemo } from 'react';
import { ActiveLink } from './ActiveLink';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/src/i18n/routing';
import clsx from 'clsx';
import { navItems } from '../server/Sidebar/menuItems';

export const BottomBar: FunctionComponent = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const navClasses = useMemo(
    () =>
      clsx(
        'z-30 flex flex-row justify-around fixed bottom-0 py-2 px-4 gap-1 bg-white border-t w-full md:hidden',
        {
          hidden:
            pathname === '/explore' ||
            pathname.split('/')?.length === 6 ||
            pathname.split('/')?.length === 5,
        }
      ),
    [pathname]
  );
  return (
    <nav className={navClasses}>
      {navItems.map(item => (
        <ActiveLink
          className="!justify-center"
          key={item.key}
          href={item.href}
          title={t(`menu.${[item.key]}.label`)}
          aria-label={t(`menu.${[item.key]}.aria_label`)}
        >
          <item.icon />
        </ActiveLink>
      ))}
    </nav>
  );
};
