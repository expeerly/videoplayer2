'use client';

import { FunctionComponent, useEffect, useState, memo, useCallback } from 'react';
import { CloseIcon, MenuIcon, RightChevronIcon } from '@/src/assets/icons';
import { Button } from '../server/Button';
import { ArrowRightIcon } from '@/src/assets/icons/ArrowRightIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuItem } from '@/src/app/components/client/DropDownMenu';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

type MobileMenuProps = {
  menuItems: MenuItem[];
};

const MobileMenuComponent: FunctionComponent<MobileMenuProps> = ({ menuItems }) => {
  const pathname = usePathname();
  const t = useTranslations('menu');
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = useCallback(
    (key: string) => {
      setActiveSubmenu(activeSubmenu === key ? null : key);
    },
    [activeSubmenu]
  );

  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
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

    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
          setActiveSubmenu(null);
        }}
        type="button"
        aria-label="Toggle menu"
        variant="secondary"
        title="Toggle menu"
        isOnlyIcon
        size="sm"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </Button>

      <div
        className={`fixed top-[70px] bottom-0 left-0 w-full bg-light-gray overflow-auto border-t h-[calc(100%-71px)] ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className={`h-full w-full justify-between flex flex-col pt-3`}>
          <ul className="px-4 scrollbar-thin scrollbar-thumb-gray-400 relative">
            {menuItems.map(item => (
              <li key={item.key}>
                {item.devider && <hr className="my-4 border-gray-300 mx-1" />}
                {!item.items?.length && item.href ? (
                  <Link
                    href={item?.href}
                    className="flex w-full items-center justify-between  text-left text-base"
                  >
                    <span className="font-bold py-2 text-black rounded">{t(item.key)}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleSubmenu(item.key)}
                    className="flex w-full items-center justify-between  text-left text-base"
                  >
                    <span className="font-bold py-2 text-black rounded">{t(item.key)}</span>

                    {item.items && (
                      <RightChevronIcon
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeSubmenu === item.key ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </button>
                )}

                {item.items && activeSubmenu === item.key && (
                  <div
                    className={clsx('mt-2 space-y-2 bg-white p-6 rounded-md', {
                      'shadow-2xl': item.key === 'language',
                    })}
                  >
                    {item.itemsLabel && item.href && (
                      <Link
                        href={item.href}
                        title={item.itemsLabel}
                        aria-label={item.itemsLabel}
                        className="w-full text-left py-2 flex flex-row gap-3 items-center text-pink-500 font-bold text-base"
                      >
                        {t(item.itemsLabel)}
                        <ArrowRightIcon />
                      </Link>
                    )}
                    {item.items.map(subItem => (
                      <Link
                        title={subItem.label}
                        href={subItem?.href}
                        key={subItem.label}
                        aria-label={subItem.label}
                        className="w-full text-left text-base flex flex-row gap-x-2 py-2 items-center"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className=" p-4 flex flex-col sm:flex-row items-center gap-3">
            <Button size="lg" fullWidth>
              Sign Up
            </Button>
            <Button size="lg" fullWidth variant="outline">
              Log In
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export const MobileMenu = memo(MobileMenuComponent);
