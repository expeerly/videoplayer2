'use client';

import React, {
  FunctionComponent,
  memo,
  SVGProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BinocularsIcon,
  CartIcon,
  CategoriesIcon,
  DownArrowIcon,
  InfoIcon,
  MenuIcon,
  RightChevronIcon,
  SpeechBubbleIcon,
  StoreIcon,
  TagIcon,
  VideoIcon,
  WorldIcon,
} from '@/src/assets/icons';
import Link from 'next/link';
import { ArrowRightIcon } from '@/src/assets/icons/ArrowRightIcon';
import { useTranslations } from 'use-intl';
import { Button } from '@/src/app/components/server/Button';

export type MenuItem = {
  key: string;
  label: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  href?: string;
  items?: {
    label: string;
    href: string;
    hasLogo?: boolean;
  }[];
  itemsLabel?: string | undefined;
  devider?: boolean | undefined;
};

export const categroies = [
  { label: 'Arts & Crafts', href: '/video-reviews/productcategory/1' },
  { label: 'Automobile', href: '/video-reviews/productcategory/2' },
  { label: 'Baby & Child Care', href: '/video-reviews/productcategory/3' },
  { label: 'Beauty & Personal Care', href: '/video-reviews/productcategory/4' },
  { label: 'Books & Media', href: '/video-reviews/productcategory/5' },
  { label: 'Clothes and Fashion', href: '/video-reviews/productcategory/6' },
  { label: 'Electronics & Gadgets', href: '/video-reviews/productcategory/7' },
  { label: 'Food & Beverages', href: '/video-reviews/productcategory/8' },
  { label: 'Furniture & Decor', href: '/video-reviews/productcategory/9' },
  {
    label: 'Gardening & Outdoor Living',
    href: '/video-reviews/productcategory/10',
  },
  { label: 'Health & Wellness', href: '/video-reviews/productcategory/11' },
];

export const defaultMenuItems: MenuItem[] = [
  { key: 'explore', label: 'Explore', icon: BinocularsIcon, href: '/explore' },
  {
    key: 'brands',
    label: 'Brands',
    icon: StoreIcon,
    href: '/video-reviews/brand',
  },
  {
    key: 'categories',
    label: 'Categories',
    icon: CategoriesIcon,
    items: categroies,
    itemsLabel: 'viewAllCategories',
    href: '/video-reviews/productcategory',
  },
  {
    key: 'reviewers',
    label: 'Reviewers',
    icon: SpeechBubbleIcon,
    devider: true,
    href: '/video-reviews/reviewers',
  },
  { key: 'learnMore', label: 'Learn more', icon: InfoIcon },
  { key: 'submitVideoReview', label: 'Submit a video review', icon: VideoIcon },
  {
    key: 'forBrandsAndBusinesses',
    label: 'For brands & businesses',
    icon: TagIcon,
  },
  {
    key: 'forMarketplaces',
    label: 'For marketplaces',
    icon: CartIcon,
    devider: true,
  },
  {
    key: 'language',
    label: 'English (EN)',
    icon: WorldIcon,
    items: [
      { label: 'Deutsch (DE)', href: '/de' },
      { label: 'English (EN)', href: '/en' },
      { label: 'French (FR)', href: '/fr' },
      { label: 'Italian (IT)', href: '/it' },
    ],
  },
];

type DropDownMenuProps = {
  menuItems?: MenuItem[];
  className?: string;
};

const DropDownMenuComponent: FunctionComponent<DropDownMenuProps> = ({
  menuItems = defaultMenuItems,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('menu');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenSubmenuKey(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
    setOpenSubmenuKey(null);
  }, [isOpen]);

  const toggleSubmenu = useCallback(
    (key: string) => {
      setOpenSubmenuKey(openSubmenuKey === key ? null : key);
    },
    [openSubmenuKey]
  );

  return (
    <>
      <div
        className={`fixed top-[90px] left-[200px] h-[calc(100%-90px)] w-[calc(100%-200px)]  bg-black bg-opacity-25 transition-opacity duration-200 ${
          isOpen ? 'opacity-100 h-full' : 'opacity-0 h-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />
      <div className={`relative z-[9999999] group/menu ${className}`} ref={menuRef}>
        <Button
          isOnlyIcon
          variant="secondary"
          onClick={toggleMenu}
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          title="MenuIcon"
        >
          <MenuIcon />
        </Button>

        <div
          id="dropdown-menu"
          className={`absolute top-12 right-0 w-[393px] bg-white  shadow-lg overflow-hidden opacity-0 h-0 group-focus-within/menu:h-auto group-focus-within/menu:opacity-100  group-focus-within/menu:overflow-visible`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <ul className=" pb-[32px] pt-[35px] ">
            {menuItems.map(item => (
              <li key={item.key} className="relative">
                {item.items ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.key)}
                      role="menuitem"
                      className="w-full flex items-center justify-between px-5 py-2 text-transparent hover:bg-gray-50 transition-colors duration-200"
                      title="item.label"
                      aria-expanded={openSubmenuKey === item.key}
                    >
                      <span className="flex gap-4 items-center">
                        <item.icon />
                        <span className="text-black">{t(item.key)}</span>
                      </span>
                      <span className="ml-2">
                        <DownArrowIcon className="group-focus-within:block hidden" />{' '}
                        <RightChevronIcon className="group-focus-within:hidden block" />
                      </span>
                    </button>
                    <div
                      className={`absolute -left-[353px] top-0 w-[353px] bg-white  shadow-lg py-1 border border-gray-100 transition-all duration-200 ${
                        openSubmenuKey === item.key
                          ? 'opacity-100 visible'
                          : 'opacity-0 invisible pointer-events-none'
                      }`}
                      role="menu"
                    >
                      {item.itemsLabel && (
                        <Link
                          role="menuitem"
                          title={item.itemsLabel}
                          href={`${item.href}`}
                          className="text-pink-500 cursor-pointer font-bold text-base flex items-center flex-row w-full text-left px-5 py-2 gap-3"
                        >
                          {t(item.itemsLabel)}
                          <ArrowRightIcon />
                        </Link>
                      )}
                      <ul>
                        {item.items.map((subItem, index) => (
                          <li key={index}>
                            <Link
                              role="menuitem"
                              href={subItem.href}
                              title={subItem.label}
                              className="flex items-center gap-2 w-full text-left px-5 py-2 text-black hover:bg-gray-50"
                            >
                              <RightChevronIcon />
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    role="menuitem"
                    className="w-full flex items-center text-transparent hover:bg-[#F7F7F7] px-5 py-2 gap-4 transition-colors duration-200"
                    href={`${item.href}`}
                    title={item.label}
                  >
                    <item.icon />
                    <span className="text-black">{t(item.key)}</span>
                  </Link>
                )}
                {item.devider && <div className="border-b border-default-200 my-4" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export const DropDownMenu = memo(DropDownMenuComponent);
