import { FunctionComponent, SVGProps } from 'react';

import { BinocularsIcon, CategoriesIcon, SpeechBubbleIcon, StoreIcon } from '@/src/assets/icons';
import { ActiveLink } from '../client/ActiveLink';
import { BottomBar } from '../client/BottomBar';
import { getDictionary } from '@/src/lib/dictionary';

type NavItemKey = 'explore' | 'brands' | 'categories' | 'reviewers';

interface NavItem {
  key: NavItemKey;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  href: string;
}

export const navItems: NavItem[] = [
  { key: 'explore', icon: BinocularsIcon, href: '/explore' },
  {
    key: 'brands',
    icon: StoreIcon,
    href: '/video-reviews/brand',
  },
  {
    key: 'categories',
    icon: CategoriesIcon,
    href: '/video-reviews/productcategory',
  },
  {
    key: 'reviewers',
    icon: SpeechBubbleIcon,
    href: '/video-reviews/reviewers',
  },
];

type Dictionary = {
  [key in NavItemKey]: { label: string; aria_label: string };
};

export const Sidebar: FunctionComponent = async () => {
  const t = (await getDictionary()).menu as Dictionary;

  return (
    <>
      <aside className="min-h-screen md:w-[25%] mid-lg:w-[275px] border-e hidden md:flex">
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
                    title={t[item.key].label}
                    ariaLabel={t[item.key].aria_label}
                  >
                    <Icon />
                    <span className="text-black">{t[item.key].label}</span>
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
