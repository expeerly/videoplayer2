'use client';
import { RightChevronIcon } from '@/src/assets/icons';
import { Avatar } from '../server/Avatar';
import { FunctionComponent, useMemo } from 'react';
import { StarRating } from '../server/StarRating';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export type ProfileCardProps = {
  description?: string;
  title?: string;
  subTitle?: string;
  imageUrl?: string;
  rating?: number;
  variant?: 'primary' | 'secondary';
  profileSlug?: string;
  dataType?: 'reviewer' | 'brand' | 'category';
};

const tempData = {
  title: 'Marisa C.',
  subTitle: '38, Zurich (CH)',
  description:
    'I love cooking and getting people around in our garden, specially when weather is good...',
};

export const ProfileCard: FunctionComponent<ProfileCardProps> = ({
  description = tempData.description,
  title = tempData.title,
  rating,
  subTitle = tempData.subTitle,
  imageUrl,
  variant = 'primary',
  profileSlug,
  dataType,
}) => {
  const t = useTranslations('dynamic_texts');

  const ariaLabel = useMemo(
    () =>
      dataType === 'category'
        ? t('home_category_icons.aria_label', { brandname: title })
        : dataType === 'brand'
          ? t('home_brand_icons.aria_label', { brandname: title })
          : t('home_hero_reviewer.aria_label', {
              firstname: title,
            }),
    [dataType, title, t]
  );

  return (
    <div>
      <Link
        href={`${profileSlug}`}
        aria-label={ariaLabel}
        className="flex items-center gap-4 py-b bg-white  w-max"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Avatar src={imageUrl} alt={title} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className=" font-bold text-grey-700">{title}</h2>
            {rating && variant === 'primary' && <StarRating rating={rating} />}
            <RightChevronIcon className="w-2 h-3" />
          </div>
          <div className="flex gap-2">
            {rating && variant === 'secondary' && <StarRating rating={rating} />}
            <p className="text-sm text-grey-500">{subTitle}</p>
          </div>
        </div>
      </Link>

      <div className="flex  sm:w-2/5 items-center mt-2">
        <p className=" text-grey-700 ml-0 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};
