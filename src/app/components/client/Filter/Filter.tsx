'use client';
import { FunctionComponent, memo, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useLocale, useTranslations } from 'use-intl';
import { CloseIcon, FilterIcon } from '@/src/assets/icons';
import { FilterItemProps } from './FilterCard';
import clsx from 'clsx';
import { usePathname, useRouter } from '@/src/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { FilterCards } from './FilterCards';
import { Button } from '../Button';
import { AllCategoriesData, Languages, AllBrandssData } from '@/src/db/types';

type TabType = 'brands' | 'categories';

type Props = {
  categoriesList: AllCategoriesData[];
  brandsList: AllBrandssData;
};

const FilterComponent: FunctionComponent<Props> = ({ categoriesList, brandsList }) => {
  const [activeTab, setActiveTab] = useState<TabType>('categories');
  const [isOpen, setIsOpen] = useState(false);
  const [pendingFilters, setPendingFilters] = useState<{ brand: string[]; category: string[] }>({
    brand: [],
    category: [],
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const local = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log({ local });

  const brands = useMemo(
    () =>
      brandsList?.map(i => ({
        name: i.brandName,
        logo: i.logo || undefined,
        id: i.id,
        slug: i.slug,
      })),
    [brandsList]
  );

  const categories = useMemo(
    () =>
      categoriesList?.map(i => ({
        name: i.categoryData?.[local === '/' ? 'en' : (local as Languages)].categoryName,
        icon: i.logo || undefined,
        id: i.id.toString(),
        slug: i.categoryData?.[local === '/' ? 'en' : (local as Languages)]?.urlSlug,
      })),
    [categoriesList, local]
  );

  const activeItems: FilterItemProps[] = useMemo(
    () => (activeTab === 'categories' ? categories : brands),
    [activeTab, categories, brands]
  );

  const appliedFilters = useMemo(() => {
    const brandSlugs = searchParams.getAll('brand');
    const categorySlugs = searchParams.getAll('category');

    return {
      brand: brandSlugs
        .map(slug => {
          const brand = brands?.find(b => b.slug === slug);
          return brand?.id.toString() || '';
        })
        .filter(Boolean),
      category: categorySlugs
        .map(slug => {
          const category = categories?.find(c => c.slug === slug);
          return category?.id.toString() || '';
        })
        .filter(Boolean),
    };
  }, [searchParams, brands, categories]);

  const totalSelectedCount = useMemo(
    () => pendingFilters.brand.length + pendingFilters.category.length,
    [pendingFilters.brand.length, pendingFilters.category.length]
  );

  const totalAppliedCount = useMemo(
    () => appliedFilters.brand.length + appliedFilters.category.length,
    [appliedFilters]
  );

  const hasFilterChanges = useMemo(() => {
    const currentAppliedFilters = appliedFilters;

    if (pendingFilters.brand.length === 0 && pendingFilters.category.length === 0) {
      return currentAppliedFilters.brand.length > 0 || currentAppliedFilters.category.length > 0;
    }

    const brandsDiff =
      pendingFilters.brand.length !== currentAppliedFilters.brand.length ||
      pendingFilters.brand.some(b => !currentAppliedFilters.brand.includes(b));

    const categoriesDiff =
      pendingFilters.category.length !== currentAppliedFilters.category.length ||
      pendingFilters.category.some(c => !currentAppliedFilters.category.includes(c));

    return brandsDiff || categoriesDiff;
  }, [pendingFilters, appliedFilters]);

  const handleItemToggle = useCallback(
    (id: string) => {
      setPendingFilters(prev => {
        const type = activeTab === 'categories' ? 'category' : 'brand';
        const currentArray = prev[type];

        if (currentArray.includes(id)) {
          return {
            ...prev,
            [type]: currentArray.filter(item => item !== id),
          };
        }

        if (currentArray.length >= 5) return prev;

        return {
          ...prev,
          [type]: [...currentArray, id],
        };
      });
    },
    [activeTab, setPendingFilters]
  );

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams();

    pendingFilters.brand.forEach(brandId => {
      const brand = brands.find(b => b.id.toString() === brandId.toString());
      if (brand?.slug) {
        params.append('brand', brand.slug);
      }
    });

    pendingFilters.category.forEach(categoryId => {
      const category = categories.find(c => c.id.toString() === categoryId.toString());
      if (category?.slug) {
        params.append('category', category.slug);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  }, [pendingFilters, pathname, router, brands, categories]);

  const handleClearFilters = useCallback(() => {
    setPendingFilters({ brand: [], category: [] });
    router.push(pathname);
  }, [pathname, router]);

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

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

  useEffect(() => {
    setPendingFilters(appliedFilters);
  }, [appliedFilters]);

  const activePendingFilters = useMemo(
    () => (activeTab === 'categories' ? pendingFilters.category : pendingFilters.brand),
    [activeTab, pendingFilters]
  );

  const selectedItemNames = useMemo(
    () =>
      activePendingFilters
        .map(id =>
          activeTab === 'categories'
            ? categories.find(c => c.id.toString() === id)?.name
            : brands.find(b => b.id.toString() === id)?.name
        )
        .filter(Boolean),
    [activePendingFilters, activeTab, categories, brands]
  );

  const filterCardsProps = useMemo(
    () => ({
      items: activeItems,
      pendingFilters: activePendingFilters,
      onToggle: handleItemToggle,
    }),
    [activeItems, activePendingFilters, handleItemToggle]
  );

  const containerClassName = useMemo(
    () =>
      clsx(' inset-0', {
        'z-50 md:z-10 fixed h-100% bg-grey-100 md:bg-transparent md:static': isOpen,
        'w-10 overflow-hidden z-10': !isOpen,
      }),
    [isOpen]
  );

  const buttonContainerClassName = useMemo(
    () =>
      clsx('', {
        'absolute right-5 top-[15px] md:top-10 md:right-8 mid-lg:right-12': isOpen,
        'h-max w-max static md:absolute md:m-0 md:top-10 md:right-8 mid-lg:right-12': !isOpen,
      }),
    [isOpen]
  );

  const buttonState = useMemo(() => {
    if (totalAppliedCount > 0 && !hasFilterChanges) {
      return {
        text: `${t('delete_filter.label')} (${totalAppliedCount})`,
        ariaLabel: t('delete_filter.aria_label'),
        onClick: handleClearFilters,
        disabled: false,
        variant: 'primary' as const,
      };
    }

    if (hasFilterChanges) {
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
          className="p-2 z-30 max-h-10 max-w-10 md:p-3 md:h-12 md:w-12 relative"
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
        className={`w-full md:w-[434px] md:right-[112px] md:absolute md:top-10 ${
          isOpen ? 'h-full w-full flex md:h-max' : 'h-0 w-0 overflow-hidden'
        }`}
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        ref={menuRef}
      >
        <div className="w-full h-full flex justify-between flex-col md:h-auto md:bg-white rounded-lg md:shadow-md">
          <div className="flex items-center h-[70px] px-5 pt-5 md:pt-3 md:h-[42px]">
            <h3 className="text-base font-normal capitalize text-left">{t('filter')}</h3>
          </div>

          <div className="flex gap-4 px-5 py-5">
            {(['brands', 'categories'] as const).map(tab => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={tab === activeTab ? 'primary' : 'outline'}
                className="capitalize w-max md:w-full h-11 md:h-10"
                aria-label={t(`filter_${tab}.aria_label`)}
              >
                {t(`filter_${tab}.label`)}
              </Button>
            ))}
          </div>

          {activePendingFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center px-5">
              <span>{t('selected')}:</span>
              {selectedItemNames.map((name, i) => (
                <span key={name}>
                  {name}
                  {i < selectedItemNames.length - 1 && ','}
                </span>
              ))}
            </div>
          )}

          <FilterCards {...filterCardsProps} />

          <div className="flex-wrap flex gap-4 py-3 px-5 border-t justify-center md:border-t-0 md:pb-[30px] mobileL:flex-nowrap">
            <Button
              href={`/video-reviews/${activeTab === 'brands' ? 'brand' : 'productcategory'}`}
              variant="outline"
              size="lg"
              aria-label={t('view_all.aria_label')}
              className="h-11 !px-0 text-center w-full"
            >
              {t('view_all.label')}
            </Button>
            <Button
              onClick={buttonState.onClick}
              size="lg"
              variant={buttonState.variant}
              disabled={buttonState.disabled}
              className="h-11 disabled:bg-grey-200 disabled:border-grey-200 border disabled:text-grey-500 disabled:hover:bg-grey-200 disabled:hover:text-grey-500 disabled:opacity-100 w-full !px-0 text-center"
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
