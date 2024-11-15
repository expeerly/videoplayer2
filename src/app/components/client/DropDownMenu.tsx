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

    key: 'learnMore',
    label: 'Learn more',
    icon: InfoIcon,
    href: 'https://www.get.expeerly.com/about-us',
  },
  { key: 'submitVideoReview', label: 'Submit a video review', icon: VideoIcon },
  {
    key: 'forBrandsAndBusinesses',
    label: 'For brands & businesses',
    icon: TagIcon,
    href: 'https://www.get.expeerly.com/for-brands',
  },
  {
    key: 'forMarketplaces',
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
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollY}px`;
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
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
        className={`hidden fixed left-0 top-[90px] md:left-[200px] h-[calc(100%-90px)] w-[calc(100%-200px)]  bg-black bg-opacity-25 md:block ${
          isOpen ? 'opacity-100 h-full' : 'opacity-0 h-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />
      <div className={`relative z-[9999999] ${className}`} ref={menuRef}>
        <Button
          isOnlyIcon
          variant="secondary"
          onClick={toggleMenu}
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          title="Show/Hide Menu"
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
          className={`flex gap-5 justify-between flex-col fixed top-[78px] right-0 w-full overflow-auto bg-light-gray  md:static md:top-0 md:bg-transparent md:w-[393px] md:h-full
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
                        title="item.label"
                        aria-expanded={openSubmenuKey === item.key}
                      >
                        <span className="flex gap-4 items-center">
                          <item.icon />
                          <span className="text-black">{t(item.key)}</span>
                        </span>
                        <span className="ml-2">
                          {openSubmenuKey === item.key ? <DownArrowIcon /> : <RightChevronIcon />}
                        </span>
                      </button>
                      <div
                        className={` w-full md:absolute md:-left-full  md:top-0  md:flex md:justify-end ${
                          openSubmenuKey === item.key
                            ? 'h-auto opacity-100 visible'
                            : 'opacity-0 invisible pointer-events-none h-0'
                        }`}
                        role="menu"
                      >
                        <div className=" w-full md:w-max bg-white md:shadow-lg py-1 md:border md:min-w-[279px] md:border-gray-100 px-6 mr-2">
                          {item.itemsLabel && (
                            <Link
                              role="menuitem"
                              title={item.itemsLabel}
                              href={`${item.href}`}
                              className="px-1 text-pink-500 cursor-pointer font-bold text-base flex items-center flex-row w-full text-left md:px-2 py-2 gap-3"
                            >
                              {t(item.itemsLabel)}
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
                      title={item.label}
                    >
                      <item.icon />
                      <span className="text-black">{t(item.key)}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className=" p-4 flex flex-col sm:flex-row items-center gap-3 md:fixed md:mt-0 md:top-6 md:p-0">
            <Button fullWidth href="https://app.expeerly.com/ " className="w-full md:w-[150px]">
              {t('signUp')}
            </Button>

            <Button
              fullWidth
              href="https://app.expeerly.com/?m=signup&user=creator"
              className="w-full md:w-[150px]"
              variant="outline"
            >
              {t('login')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export const DropDownMenu = memo(DropDownMenuComponent);
