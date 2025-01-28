'use client';

import { InterestsCategory } from '@/src/db/types';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent, useCallback, useMemo } from 'react';
import clsx from 'clsx';

type Props = {
  interests?: InterestsCategory[];
};

export const InterestsCategories: FunctionComponent<Props> = ({ interests }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedInterest = useMemo(() => Number(searchParams.get('interest')), [searchParams]);

  const handleCategoryClick = useCallback(
    (categoryId: number) => {
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

  return (
    <div className="w-full flex gap-2 overflow-auto  md:flex-wrap ">
      {interests?.map(interest => (
        <button
          key={interest.categorySlug}
          onClick={() => handleCategoryClick(interest.id)}
          className={clsx(
            'rounded-full min-w-20 h-12 w-max flex justify-center items-center',
            'transition-all duration-200 border-gray-700',
            selectedInterest === interest.id ? 'border-2' : 'border'
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
