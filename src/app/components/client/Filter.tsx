'use client';
import { FunctionComponent, memo, useCallback, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'use-intl';
import { CloseIcon, MenuIcon } from '@/src/assets/icons';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FilterCard } from '../server/FilterCard';
import { Button } from '../server/Button';
import clsx from 'clsx';

type TabType = 'brands' | 'categories';

type ItemType = {
  name: string;
  icon?: string;
  logo?: string;
};

const categories: ItemType[] = [
  { name: 'Travel', icon: '✈️' },
  { name: 'Automobile', icon: '🚗' },
  { name: 'Health & Wellness', icon: '❤️' },
  { name: 'Arts & Crafts', icon: '🎨' },
  { name: 'Baby & Child Care', icon: '👶' },
  { name: 'Home & Kitchen', icon: '🏠' },
  { name: 'Beauty & Personal Care', icon: '💅' },
  { name: 'Books & Media', icon: '📚' },
  { name: 'Clothes and Fashion', icon: '👕' },
];

const brands: ItemType[] = [
  { name: 'Bauknecht', logo: '/api/placeholder/100/40' },
  { name: 'Dyson', logo: '/api/placeholder/100/40' },
  { name: 'Get Your Guide', logo: '/api/placeholder/100/40' },
  { name: 'Koenig', logo: '/api/placeholder/100/40' },
  { name: 'Philips', logo: '/api/placeholder/100/40' },
  { name: 'Sony', logo: '/api/placeholder/100/40' },
  { name: 'Tefal', logo: '/api/placeholder/100/40' },
  { name: 'Zalando', logo: '/api/placeholder/100/40' },
];

const FilterComponent: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('categories');
  const [pendingFilters, setPendingFilters] = useState({
    brand: searchParams.get('brand'),
    category: searchParams.get('category'),
  });

  const filterCount = (pendingFilters.brand ? 1 : 0) + (pendingFilters.category ? 1 : 0);

  const updatePendingFilters = useCallback((type: 'brand' | 'category', value: string | null) => {
    setPendingFilters(prev => ({ ...prev, [type]: value }));
  }, []);

  const handleItemToggle = useCallback(
    (name: string) => {
      const type = activeTab === 'categories' ? 'category' : 'brand';
      const currentValue = pendingFilters[type];
      updatePendingFilters(type, currentValue === name ? null : name);
    },
    [activeTab, pendingFilters, updatePendingFilters]
  );

  const handleClearFilters = useCallback(() => {
    updatePendingFilters(activeTab === 'categories' ? 'category' : 'brand', null);
  }, [activeTab, updatePendingFilters]);

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    // Update brand filter
    if (pendingFilters.brand) {
      params.set('brand', pendingFilters.brand);
    } else {
      params.delete('brand');
    }

    // Update category filter
    if (pendingFilters.category) {
      params.set('category', pendingFilters.category);
    } else {
      params.delete('category');
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [pendingFilters, searchParams, pathname, router]);

  const items = activeTab === 'categories' ? categories : brands;

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth > 768)
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false);
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

  return (
    <div
      className={clsx('z-[999999999] md:z-[999999] md:pr-[50px] md:pt-[50px] inset-0', {
        'fixed  h-100% bg-light-gray md:bg-transparent md:relative': isOpen,
      })}
    >
      <Button
        isOnlyIcon
        variant="secondary"
        onClick={toggleMenu}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Show/Hide Menu"
        aria-label={isOpen ? t('menu.menu_close.aria_label') : t('menu.menu_open.aria_label')}
        id="menu-button"
        className={clsx('p-2 max-h-10 max-w-10 md:p-3 md:h-12 md:w-12 ml-auto', {
          'absolute right-5 top-[15px] md:static md:top-0 md:right-0': isOpen,
        })}
      >
        {!isOpen ? <MenuIcon /> : <CloseIcon />}
      </Button>

      <div
        id="dropdown-menu"
        className={`w-full md:w-[434px] md:right-[50px] md:absolute  md:top-[100px] ${
          isOpen ? 'h-full w-full flex md:h-max ' : 'h-0 w-0 overflow-hidden'
        }`}
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="w-full h-[calc(100%-50px)] flex justify-between flex-col md:h-auto bg-light-gray rounded-lg">
          <h3 className="h-[70px] px-10 py-5 text-base font-normal capitalize border-b text-center md:py-4 md:h-[58px]">
            {activeTab}
          </h3>
          <div className="flex gap-4 px-10 py-5 justify-center">
            {(['brands', 'categories'] as const).map(tab => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={tab === activeTab ? 'primary' : 'outline'}
                fullWidth
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="px-4 h-max md:max-h-[424px] md:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 ">
            {items.map(item => {
              const isChecked =
                pendingFilters.category === item.name || pendingFilters.brand === item.name;

              return (
                <FilterCard
                  name={item.name}
                  icon={item.icon}
                  logo={item.logo}
                  checked={isChecked}
                  key={item.name}
                  onChange={handleItemToggle}
                />
              );
            })}
          </div>

          <div className="flex mt-auto gap-4 py-3 px-10 border-t justify-center md:border-t-0 md:pb-[30px]">
            <Button onClick={handleClearFilters} variant="outline" size="lg" fullWidth>
              View All
            </Button>
            <Button onClick={handleApplyFilters} disabled={filterCount === 0} size="lg" fullWidth>
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Filter = memo(FilterComponent);
