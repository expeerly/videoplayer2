import React, {
  FunctionComponent,
  memo,
  SVGProps,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { useTranslations } from 'use-intl';
import clsx from 'clsx';

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
import { ArrowRightIcon } from '@/src/assets/icons/ArrowRightIcon';
import { Link, usePathname } from '@/src/i18n/routing';
import { CategoryData } from '@/src/db/types';

import { Button } from './Button';

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

const defaultMenuItems = (categroies: CategoryData[] = []): MenuItem[] => {
  return [
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
      items: categroies?.map(i => ({
        label: i.categoryName,
        href: `/video-reviews/productcategory/${i.urlSlug}`,
      })),
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
        { label: 'English (EN)', href: 'en' },
        { label: 'Deutsch (DE)', href: 'de' },
        { label: 'Français (FR)', href: 'fr' },
        { label: 'Italiano (IT)', href: 'it' },
      ],
    },
  ];
};

type DropDownMenuProps = {
  className?: string;
  categories: CategoryData[];
};

const DropDownMenuComponent: FunctionComponent<DropDownMenuProps> = ({
  className = '',
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenuKey, setOpenSubmenuKey] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('menu');
  const pathname = usePathname();
  const menuItems = useMemo(() => defaultMenuItems(categories), [categories]);

  // Event Handlers
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

  // Effects
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth > 768) {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setOpenSubmenuKey(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      if (isOpen) {
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

  // Memoized Classes
  const containerClasses = useMemo(
    () => clsx('relative z-10', 'md:flex md:flex-row-reverse md:items-center', className),
    [className]
  );

  const dropdownContainerClasses = useMemo(
    () =>
      clsx(
        'flex gap-5 justify-between flex-col',
        'fixed top-[70px] right-0 w-full overflow-auto bg-grey-100',
        'md:items-center md:static md:top-0 md:bg-transparent md:w-[393px] md:h-full',
        isOpen
          ? ['h-[calc(100%-70px)]', 'border-t', 'md:h-full md:border-t-0']
          : ['h-0', 'overflow-hidden', 'md:overflow-visible']
      ),
    [isOpen]
  );

  const dropdownMenuClasses = useMemo(
    () =>
      clsx(
        'md:bg-white',
        'md:right',
        'md:absolute',
        'md:top-[69px]',
        'w-full',
        'md:shadow-lg',
        'h-max',
        'rounded-lg',
        isOpen ? 'block' : 'hidden'
      ),
    [isOpen]
  );

  const menuListClasses = useMemo(
    () => clsx('pt-4 px-5 pb-[32px]', 'h-max', 'md:px-3', 'md:overflow-visible', 'md:pt-[35px]'),
    []
  );

  const submenuButtonClasses = useCallback(
    (itemKey: string) =>
      clsx(
        'w-full flex items-center justify-between',
        'px-1 rounded-lg py-2',
        'md:px-2 md:hover:bg-grey-100',
        'transition-colors duration-200',
        {
          'md:bg-grey-100 text-grey-700': openSubmenuKey === itemKey,
          'text-transparent': openSubmenuKey !== itemKey,
        }
      ),
    [openSubmenuKey]
  );

  const submenuContentClasses = useCallback(
    (itemKey: string) =>
      clsx(
        'w-full',
        'md:absolute md:-left-full md:top-0 md:flex md:justify-end',
        'overflow-hidden overflow-y-auto rounded-lg',
        openSubmenuKey === itemKey
          ? ['h-auto opacity-100 visible', 'md:h-[586px]']
          : ['opacity-0 invisible pointer-events-none h-0']
      ),
    [openSubmenuKey]
  );

  const menuItemLinkClasses = useCallback(
    (itemHref: string) =>
      clsx(
        'px-1 w-full flex items-center',
        'hover:bg-grey-100',
        'md:px-2 rounded-lg py-2 gap-4',
        'transition-colors duration-200',
        {
          'text-grey-700': pathname.includes(itemHref),
          'text-transparent': pathname !== itemHref,
        }
      ),
    [pathname]
  );

  const bottomButtonsContainerClasses = useMemo(
    () =>
      clsx(
        'p-4 flex flex-col sm:flex-row items-center gap-3',
        'md:p-0 my-auto md:ml-auto md:mr-[22px]'
      ),
    []
  );

  return (
    <>
      <div className={containerClasses} ref={menuRef}>
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
          size="sm"
          className="p-2 md:p-3 ml-auto"
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

        <div className={dropdownContainerClasses}>
          <div
            id="dropdown-menu"
            className={dropdownMenuClasses}
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <ul role="menu" className={menuListClasses}>
              {menuItems.map(item => (
                <li key={item.key} role="presentation">
                  {item.devider && <div className="border-b border-grey-300 my-4 mx-1" />}

                  {item.items ? (
                    <div
                      role="presentation"
                      className="flex h-auto flex-col relative md:flex-row-reverse"
                    >
                      <button
                        onClick={() => toggleSubmenu(item.key)}
                        role="menuitem"
                        className={submenuButtonClasses(item.key)}
                        title={t(`${item.key}.label`)}
                        aria-expanded={openSubmenuKey === item.key}
                        aria-label={t(`${item.key}.aria_label`)}
                      >
                        <span className="flex gap-4 items-center">
                          <item.icon />
                          <span className="text-grey-700">{t(`${item.key}.label`)}</span>
                        </span>
                        <span className="ml-2">
                          {openSubmenuKey === item.key ? <DownArrowIcon /> : <RightChevronIcon />}
                        </span>
                      </button>

                      <div className={submenuContentClasses(item.key)} role="menu">
                        <div className="h-max w-full md:w-max py-4 bg-white md:shadow-lg md:border md:min-w-[279px] rounded-lg md:border-grey-100 px-6 mr-2">
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
                                  locale={item.key === 'language' ? subItem.href : undefined}
                                  role="menuitem"
                                  href={item.key === 'language' ? pathname : subItem.href}
                                  title={subItem.label}
                                  className="flex items-center gap-2 w-full text-left pl-2 pr-14 py-2 rounded-lg text-ray-700 hover:bg-grey-100"
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
                      className={menuItemLinkClasses(item.href!)}
                      href={`${item.href}`}
                      title={t(`${item.key}.label`)}
                      aria-label={t(`${item.key}.aria_label`)}
                    >
                      <item.icon />
                      <span className="text-grey-700">{t(`${item.key}.label`)}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={bottomButtonsContainerClasses}>
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
