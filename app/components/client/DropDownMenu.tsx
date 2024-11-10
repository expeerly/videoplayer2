'use client';

import React, { FunctionComponent, SVGProps, useEffect, useRef, useState } from 'react';
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
} from '@/assets/icons';
import Link from 'next/link';
import { ArrowRightIcon } from '@/assets/icons/ArrowRightIcon';
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
    key: 'Categories',
    label: 'Categories',
    icon: CategoriesIcon,
    items: categroies,
    itemsLabel: 'View all categories',
    href: '/video-reviews/productcategory',
  },
  {
    key: 'reviewers',
    label: 'Reviewers',
    icon: SpeechBubbleIcon,
    devider: true,
    href: '/video-reviews/reviewers',
  },
  { key: 'learn', label: 'Learn more', icon: InfoIcon },
  { key: 'submit', label: 'Submit a video review', icon: VideoIcon },
  {
    key: 'brands_businesses',
    label: 'For brands & businesses',
    icon: TagIcon,
  },
  {
    key: 'marketplaces',
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

export const DropDownMenu: FunctionComponent<DropDownMenuProps> = ({
  menuItems = defaultMenuItems,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

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
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setOpenSubmenuKey(null);
    }
  };

  const toggleSubmenu = (key: string) => {
    setOpenSubmenuKey(openSubmenuKey === key ? null : key);
  };

  return (
    <div className={`relative z-[9999999] ${className}`} ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 p-3 rounded-full bg-[#EFEDF4] focus:ring-2 focus:ring-[#EFEDF4] focus:ring-opacity-50 transition-colors duration-200"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <MenuIcon />
      </button>

      <div
        id="dropdown-menu"
        className={`absolute top-12 right-0 w-64 bg-white rounded-md shadow-lg py-1 transition-all duration-200 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <ul>
          {menuItems.map(item => (
            <li key={item.key} className="relative">
              {item.items ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.key)}
                    className="w-full flex items-center justify-between px-4 py-2 text-transparent hover:text-black hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded={openSubmenuKey === item.key}
                  >
                    <span className="flex gap-4 items-center">
                      <item.icon />
                      <span className="text-black">{item.label}</span>
                    </span>
                    <span className="ml-2">
                      {openSubmenuKey === item.key ? <DownArrowIcon /> : <RightChevronIcon />}
                    </span>
                  </button>
                  <div
                    className={`absolute -left-64 top-0 w-64 bg-white rounded-md shadow-lg py-1 border border-gray-100 transition-all duration-200 ${
                      openSubmenuKey === item.key
                        ? 'opacity-100 visible'
                        : 'opacity-0 invisible pointer-events-none'
                    }`}
                    role="menu"
                  >
                    {item.itemsLabel && (
                      <Link
                        title={item.itemsLabel}
                        href={`${item.href}`}
                        className="text-pink-500 cursor-pointer font-bold text-base flex items-center flex-row w-full text-left px-4 py-2 gap-3"
                      >
                        {item.itemsLabel}
                        <ArrowRightIcon />
                      </Link>
                    )}
                    <ul>
                      {item.items.map((subItem, index) => (
                        <li key={index}>
                          <Link
                            href={subItem.href}
                            title={subItem.label}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
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
                  className="w-full flex items-center text-transparent hover:text-black hover:bg-[#F7F7F7] px-4 py-2 gap-4 transition-colors duration-200"
                  href={`${item.href}`}
                  title={item.label}
                >
                  <item.icon />
                  <span className="text-black">{item.label}</span>
                </Link>
              )}
              {item.devider && <div className="border-b border-default-200 my-2" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
