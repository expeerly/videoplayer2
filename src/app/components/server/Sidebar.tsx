import { FunctionComponent } from 'react';

import { BinocularsIcon, CategoriesIcon, SpeechBubbleIcon, StoreIcon } from '@/src/assets/icons';
import { ActiveLink } from '../client/ActiveLink';
import { BottomBar } from '../client/BottomBar';
import { getDictionary } from '@/src/app/[locale]/lib/dictionary';

export const navItems = [
  { key: 'explore', name: 'Explore', icon: BinocularsIcon, href: '/explore' },
  {
    key: 'brands',
    name: 'Brands',
    icon: StoreIcon,
    href: '/video-reviews/brand',
  },
  {
    key: 'categories',
    name: 'Categories',
    icon: CategoriesIcon,
    href: '/video-reviews/productcategory',
  },
  {
    key: 'reviewers',
    name: 'Reviewers',
    icon: SpeechBubbleIcon,
    href: '/video-reviews/reviewers',
  },
];

export const Sidebar: FunctionComponent = async () => {
  const t: { [key: string]: string } = (await getDictionary()).menu;
  return (
    <>
      <aside className="min-h-screen w-[200px] border-e hidden md:flex">
        <nav className="p-4 mx-auto w-full fixed top-24 max-w-[200px]">
          <ul>
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.key}>
                  <ActiveLink key={item.name} href={item.href} title={item.name}>
                    <Icon />
                    <span className="text-black">{t[item.key]}</span>
                  </ActiveLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <BottomBar />
    </>
  );
};
