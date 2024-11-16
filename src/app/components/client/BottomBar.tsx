import React, { FunctionComponent, memo } from 'react';
import { navItems } from '../server/Sidebar';
import { ActiveLink } from './ActiveLink';

const BottomBarComponent: FunctionComponent = () => {
  return (
    <nav className="z-[99999] flex flex-row justify-around fixed bottom-0 py-2 px-4 gap-1 bg-white border-t w-full md:hidden">
      {navItems.map(item => (
        <ActiveLink className="!justify-center" key={item.name} href={item.href} title={item.name}>
          <item.icon />
        </ActiveLink>
      ))}
    </nav>
  );
};

export const BottomBar = memo(BottomBarComponent);
