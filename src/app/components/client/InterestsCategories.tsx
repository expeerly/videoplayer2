'use client';

import { AllCategoriesData, InterestsCategory, Languages } from '@/src/db/types';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useLocale } from 'next-intl';

type Props = {
  interests?: InterestsCategory[];
  allCategories: AllCategoriesData[];
};

export const InterestsCategories: FunctionComponent<Props> = ({ interests, allCategories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const selectedInterest = useMemo(() => searchParams.get('interest'), [searchParams]);

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (selectedInterest === categoryId) {
        params.delete('interest');
        const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
        router.replace(newUrl);
      } else {
        params.set('interest', categoryId.toString());
        router.replace(`${pathname}?${params}`);
      }
    },
    [pathname, router, searchParams, selectedInterest]
  );

  useEffect(() => {
    // Only proceed if there's a selected interest
    if (!selectedInterest) return;

    const currentCategory = allCategories.find(category =>
      Object.values(category.categoryData).some(data => data.urlSlug === selectedInterest)
    );

    if (!currentCategory) return;

    const translatedSlug = currentCategory.categoryData[locale as Languages]?.urlSlug;

    if (translatedSlug && translatedSlug !== selectedInterest) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('interest', translatedSlug);
      router.replace(`${pathname}?${params}`);
    }
  }, [allCategories, locale, pathname, router, searchParams, selectedInterest]);

  return (
    <div className="w-full flex gap-2 overflow-auto  md:flex-wrap ">
      {interests?.map(interest => (
        <button
          key={interest.categorySlug}
          onClick={() => handleCategoryClick(interest.categorySlug)}
          className={clsx(
            'rounded-full min-w-20 h-12 w-max flex justify-center items-center',
            'transition-all duration-200 border-gray-700',
            selectedInterest === interest.categorySlug ? 'border-2' : 'border'
          )}
          aria-label={`Select ${interest.categorySlug} category`}
        >
          <Image
            alt={interest.categorySlug}
            src={interest.logo}
            width={40}
            height={40}
            sizes="100%"
          />
        </button>
      ))}
    </div>
  );
};
