'use client';
import { FunctionComponent, memo, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useTranslations } from 'use-intl';
import { CloseIcon, FilterIcon } from '@/src/assets/icons';
import { FilterCard } from '../server/FilterCard';
import { Button } from '../server/Button';
import clsx from 'clsx';
import { usePathname, useRouter } from '@/src/i18n/routing';
import { useSearchParams } from 'next/navigation';

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

  const initialFilters = useMemo(
    () => ({
      brand: searchParams.getAll('brand') || [],
      category: searchParams.getAll('category') || [],
    }),
    [searchParams]
  );

  const [pendingFilters, setPendingFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const totalSelectedCount = useMemo(
    () => pendingFilters.brand.length + pendingFilters.category.length,
    [pendingFilters]
  );

  const totalAppliedCount = useMemo(
    () => appliedFilters.brand.length + appliedFilters.category.length,
    [appliedFilters]
  );

  const hasFilterChanges = useCallback(() => {
    if (pendingFilters.brand.length === 0 && pendingFilters.category.length === 0) {
      return appliedFilters.brand.length > 0 || appliedFilters.category.length > 0;
    }

    const brandsDiff =
      pendingFilters.brand.length !== appliedFilters.brand.length ||
      pendingFilters.brand.some(b => !appliedFilters.brand.includes(b));

    const categoriesDiff =
      pendingFilters.category.length !== appliedFilters.category.length ||
      pendingFilters.category.some(c => !appliedFilters.category.includes(c));

    return brandsDiff || categoriesDiff;
  }, [pendingFilters, appliedFilters]);

  const updatePendingFilters = useCallback((type: 'brand' | 'category', name: string) => {
    setPendingFilters(prev => {
      const currentArray = prev[type];
      if (currentArray.includes(name)) {
        return {
          ...prev,
          [type]: currentArray.filter(item => item !== name),
        };
      }
      if (currentArray.length >= 5) return prev;
      return {
        ...prev,
        [type]: [...currentArray, name],
      };
    });
  }, []);

  const handleItemToggle = useCallback(
    (name: string) => {
      const type = activeTab === 'categories' ? 'category' : 'brand';
      updatePendingFilters(type, name);
    },
    [activeTab, updatePendingFilters]
  );

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams();
    pendingFilters.brand.forEach(brand => params.append('brand', brand));
    pendingFilters.category.forEach(category => params.append('category', category));

    setAppliedFilters({
      brand: [...pendingFilters.brand],
      category: [...pendingFilters.category],
    });

    router.push(`${pathname}?${params.toString()}`);
  }, [pendingFilters, pathname, router]);

  const handleClearFilters = useCallback(() => {
    setPendingFilters({ brand: [], category: [] });
    setAppliedFilters({ brand: [], category: [] });
    router.push(pathname);
  }, [pathname, router]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleBodyScroll = useCallback((isMenuOpen: boolean) => {
    if (window.innerWidth < 768) {
      if (isMenuOpen) {
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
  }, []);

  useEffect(() => {
    handleBodyScroll(isOpen);
    return () => handleBodyScroll(false);
  }, [isOpen, handleBodyScroll]);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (pathname) setIsOpen(false);
  }, [pathname]);

  const buttonState = useMemo(() => {
    if (totalAppliedCount > 0 && !hasFilterChanges()) {
      return {
        text: `${t('delete_filter.label')} (${totalAppliedCount})`,
        ariaLabel: t('delete_filter.aria_label'),
        onClick: handleClearFilters,
        disabled: false,
        variant: 'primary' as const,
      };
    }

    if (hasFilterChanges()) {
      return {
        text:
          totalSelectedCount > 0
            ? `${t('apply_filter.label')} (${totalSelectedCount})`
            : t('apply_filter.label'),
        onClick: handleApplyFilters,
        ariaLabel: t('apply_filter.aria_label'),
        disabled: false,
        variant: 'primary' as const,
      };
    }

    return {
      text: t('apply_filter.label'),
      ariaLabel: t('apply_filter.aria_label'),
      onClick: handleApplyFilters,
      disabled: true,
      variant: 'secondary' as const,
    };
  }, [
    totalAppliedCount,
    hasFilterChanges,
    totalSelectedCount,
    t,
    handleClearFilters,
    handleApplyFilters,
  ]);

  const activeItems = useMemo(
    () => (activeTab === 'categories' ? categories : brands),
    [activeTab]
  );

  const activePendingFilters = useMemo(
    () => (activeTab === 'categories' ? pendingFilters.category : pendingFilters.brand),
    [activeTab, pendingFilters]
  );

  const FilterCards = memo(
    ({
      items,
      pendingFilters,
      onToggle,
    }: {
      items: ItemType[];
      pendingFilters: string[];
      onToggle: (name: string) => void;
    }) => (
      <>
        {items.map(item => (
          <FilterCard
            key={item.name}
            name={item.name}
            icon={item.icon}
            logo={item.logo}
            checked={pendingFilters.includes(item.name)}
            onChange={onToggle}
          />
        ))}
      </>
    )
  );

  FilterCards.displayName = 'FilterCards';

  const containerClassName = clsx('z-[999999999] md:z-[999999] inset-0', {
    'fixed h-100% bg-gray-100 md:bg-transparent md:relative': isOpen,
  });

  const buttonContainerClassName = clsx({
    'absolute right-5 top-[15px] md:static md:top-0 md:right-0': isOpen,
    'mt-5 mr-5 md:m-0': !isOpen,
  });

  return (
    <div className={containerClassName}>
      <div className={buttonContainerClassName}>
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
          className="p-2 max-h-10 max-w-10 ml-auto md:mr-12 md:mt-10 md:p-3 md:h-12 md:w-12 relative"
        >
          {totalAppliedCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 text-[10px] font-bold text-white bg-pink-500 rounded-full flex items-center justify-center">
              {totalAppliedCount}
            </span>
          )}
          {!isOpen ? <FilterIcon /> : <CloseIcon />}
        </Button>
      </div>

      <div
        id="dropdown-menu"
        className={`w-full md:w-[434px] md:right-[112px] md:absolute md:top-[0px] ${
          isOpen ? 'h-full w-full flex md:h-max' : 'h-0 w-0 overflow-hidden'
        }`}
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        ref={menuRef}
      >
        <div className="w-full h-full flex justify-between flex-col md:h-auto md:bg-white rounded-lg md:shadow-md">
          {/* Header */}
          <div className="flex justify-center items-center h-[70px] px-10 py-5 border-b md:py-4 md:h-[58px]">
            <h3 className="text-base font-normal capitalize text-center">{t('filter')}</h3>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-4 px-5 py-5">
            {(['brands', 'categories'] as const).map(tab => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={tab === activeTab ? 'primary' : 'outline'}
                className="capitalize w-max md:w-full"
                aria-label={t(`filter_${tab}.aria_label`)}
              >
                {t(`filter_${tab}.label`)}
              </Button>
            ))}
          </div>

          {/* Selected filters */}
          <div className="w-full overflow-x-auto overflow-y-hidden px-5 mb-3 flex gap-1 flex-wrap md:flex-nowrap ">
            {activePendingFilters.map(item => (
              <div
                key={item}
                className="flex text-nowrap w-max items-center gap-[6px] px-4 py-[7.5px] bg-gray-100 border border-gray-300 text-gray-600 rounded-full text-sm"
              >
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* Filter cards */}
          <div className="flex-1 overflow-y-auto md:max-h-[424px]">
            <div className="px-5 h-max overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
              <FilterCards
                items={activeItems}
                pendingFilters={activePendingFilters}
                onToggle={handleItemToggle}
              />
            </div>
          </div>

          <div className=" flex-wrap flex gap-4 py-3 px-5 border-t justify-center md:border-t-0 md:pb-[30px] mobileL:flex-nowrap">
            <Button
              href={`/video-reviews/${activeTab === 'brands' ? 'brand' : 'productcategory'}`}
              variant="outline"
              size="lg"
              aria-label={t('view_all.aria_label')}
              className=" !px-0 text-center w-full"
            >
              {t('view_all.label')}
            </Button>
            <Button
              onClick={buttonState.onClick}
              size="lg"
              variant={buttonState.variant}
              disabled={buttonState.disabled}
              className="disabled:bg-gray-200 disabled:text-gray-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 disabled:opacity-100 w-full !px-0 text-center"
              aria-label={buttonState.ariaLabel}
            >
              {buttonState.text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Filter = memo(FilterComponent);
