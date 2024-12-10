import { FunctionComponent } from 'react';

import { ActiveLink } from '../../client/ActiveLink';
import { getDictionary } from '@/src/lib/dictionary';
import { navItems } from './menuItems';

export const Sidebar: FunctionComponent = async () => {
  const { t } = await getDictionary();

  return (
    <>
      <aside className="min-h-[calc(100vh-81px)] md:w-[25%] mid-lg:w-[275px] border-e hidden md:flex">
        <nav className="p-4 pl-5 mid-lg:pl-9 fixed top-24 w-[25%] mid-lg:w-[275px]">
          <ul>
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.key}>
                  <ActiveLink
                    className="my-2 w-full"
                    key={item.key}
                    href={item.href}
                    title={t(`menu.${[item.key]}.label`)}
                    aria-label={t(`menu.${[item.key]}.aria_label`)}
                  >
                    <Icon />
                    <span className="text-black">{t(`menu.${[item.key]}.label`)}</span>
                  </ActiveLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};
