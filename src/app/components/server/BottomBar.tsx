import React, { FunctionComponent } from 'react';
import { navItems } from './Sidebar';
import { ActiveLink } from '../client/ActiveLink';
import { getDictionary } from '@/src/lib/dictionary';

export const BottomBar: FunctionComponent = async () => {
  const { t } = await getDictionary();
  return (
    <nav className="z-30 flex flex-row justify-around fixed bottom-0 py-2 px-4 gap-1 bg-white border-t w-full md:hidden">
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
