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
  CloseIcon,
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
import clsx from 'clsx';
import { usePathname } from '@/src/i18n/routing';

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
  itemsLabel?: string;
  devider?: boolean;
};

export const categroies = [
  { label: 'Arts & Crafts', href: '/video-reviews/productcategory/1' },
  { label: 'Automotive', href: '/video-reviews/productcategory/2' },
  { label: 'Baby & Child Care', href: '/video-reviews/productcategory/3' },
  { label: 'Beauty & Personal Care', href: '/video-reviews/productcategory/4' },
  { label: 'Books & Media', href: '/video-reviews/productcategory/5' },
  { label: 'Clothes and Fashion', href: '/video-reviews/productcategory/6' },
  { label: 'Electronics & Gadgets', href: '/video-reviews/productcategory/7' },
  { label: 'Food & Beverages', href: '/video-reviews/productcategory/8' },
  { label: 'Furniture & Decor', href: '/video-reviews/productcategory/9' },
  { label: 'Gardening & Outdoor Living', href: '/video-reviews/productcategory/10' },
  { label: 'Health & Wellness', href: '/video-reviews/productcategory/11' },
  { label: 'Home & Kitchen', href: '/video-reviews/productcategory/12' },
  { label: 'Jewelry and Watches', href: '/video-reviews/productcategory/13' },
  { label: 'Music & Instruments', href: '/video-reviews/productcategory/14' },
  { label: 'Office Supplies', href: '/video-reviews/productcategory/15' },
  { label: 'Pet Supplies', href: '/video-reviews/productcategory/16' },
  { label: 'Sports & Outdoors', href: '/video-reviews/productcategory/17' },
  { label: 'Toys & Games', href: '/video-reviews/productcategory/18' },
  { label: 'Tools & Home Improvement', href: '/video-reviews/productcategory/19' },
  { label: 'Travel', href: '/video-reviews/productcategory/20' },
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
    key: 'reviewers',
    label: 'Reviewers',
    icon: SpeechBubbleIcon,
    href: '/video-reviews/reviewers',
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
    devider: true,

    key: 'learn_more',
    label: 'Learn more',
    icon: InfoIcon,
    href: 'https://www.get.expeerly.com/about-us',
  },
  { key: 'submit_video_review', label: 'Submit a video review', icon: VideoIcon },
  {
    key: 'for_brands',
    label: 'For brands & businesses',
    icon: TagIcon,
    href: 'https://www.get.expeerly.com/for-brands',
  },
  {
    key: 'for_marketplaces',
    label: 'For marketplaces',
    icon: CartIcon,
    href: 'https://www.get.expeerly.com/for-marketplaces',
  },
  {
    devider: true,
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
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth > 768)
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

  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      if (isOpen) {
        // First scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
          document.body.style.top = '0';
          document.body.style.overflow = 'hidden';
        }, 300);
      } else {
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
        className={`hidden fixed right-0 top-[90px] h-[calc(100%-90px)]  md:w-[75%] mid-lg:w-[calc(100%-275px)]  bg-black bg-opacity-25 md:block ${
          isOpen ? 'opacity-100 h-full' : 'opacity-0 h-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />
      <div
        className={`relative z-[9999999] md:flex md:flex-row-reverse md:items-center ${className}`}
        ref={menuRef}
      >
        <Button
          isOnlyIcon
          variant="secondary"
          onClick={toggleMenu}
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          title="Show/Hide Menu"
          aria-label={isOpen ? t('menu_close.aria_label') : t('menu_open.aria_label')}
          id="menu-button"
          className="p-2 h-10 w-10 md:p-3 md:h-12 md:w-12 ml-auto"
        >
          {!isOpen ? (
            <MenuIcon />
          ) : (
            <>
              <CloseIcon className="block md:hidden" />
              <MenuIcon className="hidden md:block" />
            </>
          )}
        </Button>
        <div
          className={`flex gap-5 justify-between flex-col fixed top-[78px] right-0 w-full overflow-auto bg-light-gray md:items-center md:static md:top-0 md:bg-transparent md:w-[393px] md:h-full
             ${isOpen ? 'h-[calc(100%-78px)] border-t md:h-full md:border-t-0 ' : 'h-0 overflow-hidden md:overflow-visible'}`}
        >
          <div
            id="dropdown-menu"
            className={`md:bg-white md:right md:absolute md:top-[69px] w-full md:shadow-lg h-max ${
              isOpen ? 'block' : 'hidden'
            }`}
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <ul
              role="menu"
              className="pt-4 px-5 pb-[32px]  h-max md:px-3 md:overflow-visible md:pt-[35px] "
            >
              {menuItems.map(item => (
                <li key={item.key} role="presentation" className="">
                  {item.devider && <div className="border-b border-gray-300 my-4 mx-1" />}
                  {item.items ? (
                    <div
                      role="presentation"
                      className="flex h-auto flex-col relative md:flex-row-reverse"
                    >
                      <button
                        onClick={() => toggleSubmenu(item.key)}
                        role="menuitem"
                        className={clsx(
                          'w-full flex items-center justify-between px-1 rounded-lg py-2 text-transparent md:px-2 md:hover:bg-gray-50 transition-colors duration-200',
                          {
                            'md:bg-light-gray': openSubmenuKey === item.key,
                          }
                        )}
                        title={t(`${item.key}.label`)}
                        aria-expanded={openSubmenuKey === item.key}
                        aria-label={t(`${item.key}.aria_label`)}
                      >
                        <span className="flex gap-4 items-center">
                          <item.icon />
                          <span className="text-black">{t(`${item.key}.label`)}</span>
                        </span>
                        <span className="ml-2">
                          {openSubmenuKey === item.key ? <DownArrowIcon /> : <RightChevronIcon />}
                        </span>
                      </button>
                      <div
                        className={` w-full md:absolute md:-left-full md:top-0 md:flex md:justify-end overflow-hidden overflow-y-auto ${
                          openSubmenuKey === item.key
                            ? 'h-auto opacity-100 visible md:h-[586px] '
                            : 'opacity-0 invisible pointer-events-none h-0'
                        }`}
                        role="menu"
                      >
                        <div className=" h-max  w-full md:w-max py-4 bg-white md:shadow-lg  md:border md:min-w-[279px] md:border-gray-100 px-6 mr-2">
                          {item.itemsLabel && (
                            <Link
                              role="menuitem"
                              title={t(`${item.key}.label`)}
                              href={`${item.href}`}
                              className="px-1 text-pink-500 cursor-pointer font-bold text-base flex items-center flex-row w-full text-left md:px-2 py-2 gap-3"
                              aria-label={t(`${item.key}.aria_label`)}
                            >
                              {t(`${item.key}.label`)}
                              <ArrowRightIcon />
                            </Link>
                          )}
                          <ul role="menu">
                            {item.items.map((subItem, index) => (
                              <li key={index} role="presentation">
                                <Link
                                  role="menuitem"
                                  href={subItem.href}
                                  title={subItem.label}
                                  className="flex items-center gap-2 w-full text-left pl-2 pr-14 py-2 rounded-lg text-black hover:bg-gray-50"
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      role="menuitem"
                      className="px-1 w-full flex items-center text-transparent hover:bg-light-gray md:px-2 rounded-lg py-2 gap-4 transition-colors duration-200"
                      href={`${item.href}`}
                      title={t(`${item.key}.label`)}
                      aria-label={t(`${item.key}.aria_label`)}
                    >
                      <item.icon />
                      <span className="text-black">{t(`${item.key}.label`)}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className=" p-4 flex flex-col sm:flex-row items-center gap-3 md:p-0 my-auto">
            <Button
              fullWidth
              href="https://app.expeerly.com/?m=signup&user=creator"
              className="w-full md:w-[150px]"
              aria-label={t('sign_up.aria_label')}
              title={t('sign_up.label')}
            >
              {t('sign_up.label')}
            </Button>

            <Button
              fullWidth
              href="https://app.expeerly.com/"
              className="w-full md:w-[150px]"
              variant="outline"
              aria-label={t('login.aria_label')}
              title={t('login.label')}
            >
              {t('login.label')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export const DropDownMenu = memo(DropDownMenuComponent);
