'use client';

import React, { FunctionComponent } from 'react';
import { navItems } from '../server/Sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const BottomBar: FunctionComponent = () => {
  const pathname = usePathname();

  return (
    <nav className="z-[99999] flex flex-row justify-around fixed bottom-0 py-2 bg-white border-t w-full md:hidden">
      {navItems.map(item => (
        <Link
          key={item.name}
          className={`flex w-full justify-center items-center py-2 px-4 gap-2 rounded transition-all duration-200 
            hover:bg-gray-100 hover:text-black focus:outline-none
            ${pathname.includes(item.href) ? 'bg-gray-100 text-black' : 'text-transparent'}`}
          href={item.href}
        >
          <item.icon className="w-5 h-5" />
        </Link>
      ))}
    </nav>
  );
};
