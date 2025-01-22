import { RightChevronIcon } from '@/src/assets/icons';
import { Avatar } from './Avatar';
import { FunctionComponent } from 'react';
import { StarRating } from './StarRating';
import Link from 'next/link';
import { getDictionary } from '@/src/lib/dictionary';

export type ProfileCardProps = {
  description?: string;
  title: string;
  variant?: 'primary' | 'secondary';
  profileSlug?: string;
  dataType?: 'reviewer' | 'brand' | 'category';

  reviewsCount?: string;
  age?: number;
  bio?: string;
  location?: string;
  country?: string;
  rating?: number;
  imageUrl?: string;
};

export const ProfileCard: FunctionComponent<ProfileCardProps> = async ({
  title,
  imageUrl,
  variant = 'primary',
  profileSlug,
  dataType,
  reviewsCount,
  bio,
  age,
  location,
  country,
  rating,
}) => {
  const { t } = await getDictionary();

  return (
    <>
      <Link
        href={
          profileSlug
            ? dataType === 'category'
              ? `/video-reviews/productcategory/${profileSlug}`
              : dataType === 'brand'
                ? `/video-reviews/brand/${profileSlug}`
                : `/video-reviews/reviewers/${profileSlug}`
            : ''
        }
        aria-label={
          dataType === 'category'
            ? t('dynamic_texts.home_category_icons.aria_label', { brandname: title })
            : dataType === 'brand'
              ? t('dynamic_texts.home_brand_icons.aria_label', { brandname: title })
              : t('dynamic_texts.home_hero_reviewer.aria_label', {
                  firstname: title,
                })
        }
        className="flex items-center gap-4 py-b bg-white  w-max"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Avatar src={imageUrl} alt={title} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className=" font-bold text-grey-700">
              {dataType === 'reviewer'
                ? title
                    .split(' ')
                    .map((part, index, arr) =>
                      index === arr.length - 1 ? part.charAt(0) + '.' : part + ' '
                    )
                    .join('')
                : title}
            </h3>
            {rating && variant === 'primary' && <StarRating rating={rating} />}
            <RightChevronIcon className="w-2 h-3" />
          </div>
          <div className="flex gap-2">
            {rating && variant === 'secondary' && <StarRating rating={rating} />}
            <p className="text-sm text-grey-500">
              {dataType === 'category'
                ? `${reviewsCount} reviews`
                : dataType === 'reviewer'
                  ? `${age}, ${location} ${country ?? ''}`
                  : dataType === 'brand'
                    ? `${reviewsCount} reviews`
                    : `${reviewsCount} reviews`}
            </p>
          </div>
        </div>
      </Link>

      {!!bio && (
        <div className="flex  sm:w-2/5 items-center mt-2">
          <p className=" text-grey-700 ml-0 line-clamp-2">{bio}</p>
        </div>
      )}
    </>
  );
};
