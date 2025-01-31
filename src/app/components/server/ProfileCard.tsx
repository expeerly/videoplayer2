import { RightChevronIcon } from '@/src/assets/icons';
import { Avatar } from '../client/Avatar';
import { FunctionComponent } from 'react';
import { StarRating } from './StarRating';
import Link from 'next/link';
import { getDictionary } from '@/src/lib/dictionary';
import { LongDescription } from '../client/LongDescription';

export type ProfileCardProps = {
  description?: string;
  title: string;
  variant?: 'primary' | 'secondary';
  profileSlug?: string;
  dataType?: 'brand' | 'brand-feed' | 'category' | 'product-feed' | 'reviewer';

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

  const getProfileUrl = (type?: string, slug?: string) => {
    if (!slug) return '';

    const paths = {
      category: `/video-reviews/productcategory/${slug}`,
      brand: `/video-reviews/brand/${slug}`,
      reviewer: `/video-reviews/reviewers/${slug}`,
      'product-feed': `/explore/product/${slug}`,
      'brand-feed': `/explore/brand/${slug}`,
    };

    return paths[type as keyof typeof paths] || '';
  };

  const url = getProfileUrl(dataType, profileSlug);

  return (
    <>
      <Link
        href={url}
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
            <Avatar
              src={imageUrl}
              alt={title}
              className={dataType === 'reviewer' ? '[&>img]:object-cover [&>img]:object-top' : ''}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2">
            <h3 className=" font-bold text-grey-700 max-w-60 truncate">{title}</h3>
            {rating && variant === 'primary' && <StarRating rating={rating} />}
            <RightChevronIcon className="w-2 h-3" />
          </div>
          <div className="flex gap-2">
            {rating && variant === 'secondary' && <StarRating rating={rating} />}
            <p className="text-sm text-grey-500">
              {dataType === 'category'
                ? `${reviewsCount} ${!!reviewsCount && (Number(reviewsCount) > 1 ? t('reviews') : t('singleReview'))}`
                : dataType === 'reviewer'
                  ? `${age}, ${location}, ${country ?? ''}`
                  : dataType === 'brand'
                    ? `${reviewsCount} ${!!reviewsCount && (Number(reviewsCount) > 1 ? t('reviews') : t('singleReview'))}`
                    : `${reviewsCount} ${!!reviewsCount && (Number(reviewsCount) > 1 ? t('reviews') : t('singleReview'))}`}
            </p>
          </div>
        </div>
      </Link>

      {!!bio && (
        <div className="flex w-full sm:w-2/3 items-center mt-2">
          <LongDescription
            scrollToTop={false}
            text={bio}
            maxLines={2}
            paragraphClassName="text-grey-700"
          />
        </div>
      )}
    </>
  );
};
