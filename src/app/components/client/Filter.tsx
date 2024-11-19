'use client';
import { FunctionComponent, memo, useCallback, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'use-intl';
import { CloseIcon, FilterIcon } from '@/src/assets/icons';
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
  { name: 'Electronics & Gadgets', icon: '📱' },
  { name: 'Food & Beverages', icon: '🍔' },
  { name: 'Furniture & Decor', icon: '🛋️' },
  { name: 'Gardening & Outdoor Living', icon: '🌻' },
  { name: 'Jewelry and Watches', icon: '💎' },
  { name: 'Music & Instruments', icon: '🎸' },
  { name: 'Office Supplies', icon: '📎' },
  { name: 'Pet Supplies', icon: '🐾' },
  { name: 'Sports & Outdoors', icon: '🏀' },
  { name: 'Toys & Games', icon: '🧸' },
  { name: 'Tools & Home Improvement', icon: '🔧' },
];

const brands: ItemType[] = [
  { name: 'Dyson', logo: '/brands/logo.svg' },
  { name: 'Philips', logo: '/brands/logo1.svg' },
  { name: 'Sony', logo: '/brands/logo13.svg' },
  { name: 'Tefal', logo: '/brands/logo11.svg' },
  { name: 'Zalando', logo: '/brands/logo14.svg' },
  { name: 'Get Your Guide', logo: '/brands/logo11.svg' },
  { name: 'Koenig', logo: '/brands/logo5.svg' },
  { name: 'Bauknecht', logo: '/brands/logo12.svg' },
  { name: 'Dyson_1', logo: '/brands/logo.svg' },
  { name: 'Philips_2', logo: '/brands/logo1.svg' },
  { name: 'Sony_3', logo: '/brands/logo13.svg' },
  { name: 'Tefal_4', logo: '/brands/logo11.svg' },
  { name: 'Zalando_5', logo: '/brands/logo14.svg' },
  { name: 'Get Your Guide_6', logo: '/brands/logo11.svg' },
  { name: 'Koenig_7', logo: '/brands/logo5.svg' },
  { name: 'Bauknecht_8', logo: '/brands/logo12.svg' },
];

const FilterComponent: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('categories');

  // Track both current and applied filters
  const [pendingFilters, setPendingFilters] = useState({
    brand: searchParams.get('brand'),
    category: searchParams.get('category'),
  });

  const [appliedFilters, setAppliedFilters] = useState({
    brand: searchParams.get('brand'),
    category: searchParams.get('category'),
  });

  const hasFilterChanges = useCallback(() => {
    return (
      pendingFilters.brand !== appliedFilters.brand ||
      pendingFilters.category !== appliedFilters.category
    );
  }, [pendingFilters, appliedFilters]);

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

  const handleApplyFilters = useCallback(() => {
    // Don't proceed if nothing has changed
    if (!hasFilterChanges()) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

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

    // Store the successfully applied filters
    setAppliedFilters({
      brand: pendingFilters.brand,
      category: pendingFilters.category,
    });

    // Update URL
    router.push(`${pathname}?${params.toString()}`);
  }, [pendingFilters, searchParams, pathname, router, hasFilterChanges]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        window.innerWidth > 768 &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
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
      className={clsx('z-[999999999] md:z-[999999] inset-0', {
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
        className={clsx(
          'p-2 max-h-10 max-w-10 ml-auto md:mr-[50px] md:mt-[50px] md:p-3 md:h-12 md:w-12',
          {
            'absolute right-5 top-[15px] md:static md:top-0 md:right-0': isOpen,
            'mt-5 mr-5 ': !isOpen,
          }
        )}
      >
        {!isOpen ? <FilterIcon /> : <CloseIcon />}
      </Button>

      <div
        id="dropdown-menu"
        className={`w-full md:w-[434px] md:right-[50px] md:absolute  md:top-[100px] ${
          isOpen ? 'h-full w-full flex md:h-max ' : 'h-0 w-0 overflow-hidden'
        }`}
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        ref={menuRef}
      >
        <div className="w-full h-full flex justify-between flex-col md:h-auto bg-light-gray rounded-lg">
          <div className="flex justify-center items-center h-[70px] px-10 py-5 border-b  md:py-4 md:h-[58px]">
            <h3 className="text-base font-normal capitalize text-center">{activeTab}</h3>
          </div>
          <div className="flex gap-4 px-5 py-5 md:px-10">
            {(['brands', 'categories'] as const).map(tab => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={tab === activeTab ? 'primary' : 'outline'}
                className="capitalize w-max md:w-full"
              >
                {tab}
              </Button>
            ))}
          </div>
          {/* <div className="w-full overflow-x-auto overflow-y-hidden px-5 mb-3 flex gap-1">
            <div
              key={pendingFilters?.[activeTab]}
              className="flex w-max items-center gap-[6px] px-4 py-[7.5px] bg-gray-100 border border-gray-300 text-gray-600 rounded-full text-sm"
            >
              <span className="text-sm">{pendingFilters?.[activeTab]}</span>
              <button
                onClick={() => handleItemToggle(i!)}
                className="focus:outline-none"
              >
                <CloseIcon className="h-4" />
              </button>
            </div>
          </div> */}
          <div className="flex-1 overflow-y-auto md:max-h-[424px]">
            <div className="px-5 h-max overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 md:px-10">
              {(activeTab === 'categories' ? categories : brands).map(item => {
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
          </div>

          <div className="flex gap-4 py-3 px-5 border-t justify-center md:px-10 md:border-t-0 md:pb-[30px]">
            <Button
              href={`/video-reviews/${activeTab === 'brands' ? 'brand' : 'productcategory'}`}
              variant="outline"
              size="lg"
              fullWidth
            >
              View All
            </Button>
            <Button
              onClick={handleApplyFilters}
              size="lg"
              fullWidth
              variant={hasFilterChanges() ? 'primary' : 'secondary'}
              disabled={!hasFilterChanges()}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Filter = memo(FilterComponent);
