import React, { FunctionComponent, memo } from 'react';
import { navItems } from '../server/Sidebar';
import { ActiveLink } from './ActiveLink';
import { getDictionary } from '@/src/lib/dictionary';

const BottomBarComponent: FunctionComponent = async () => {
  const t = (await getDictionary()).menu;
  return (
    <nav className="z-30 flex flex-row justify-around fixed bottom-0 py-2 px-4 gap-1 bg-white border-t w-full md:hidden">
      {navItems.map(item => (
        <ActiveLink
          className="!justify-center"
          key={item.key}
          href={item.href}
          title={t[item.key].label}
          aria-label={t[item.key].aria_label}
        >
          <item.icon />
        </ActiveLink>
      ))}
    </nav>
  );
};

export const BottomBar = memo(BottomBarComponent);
