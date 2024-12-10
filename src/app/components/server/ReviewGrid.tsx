import React, { FunctionComponent } from 'react';
import { ReviewCard } from '../server/ReviewCard';
import { ProfileCard, ProfileCardProps } from './ProfileCard';
import clsx from 'clsx';

type ReviewGridProps = {
  headerData?: ProfileCardProps;
  classNames?: {
    containerClassName?: string;
    cardClassName?: string;
    gridClassName?: string;
    headerContainerClassName?: string;
    headerProfileClassName?: string;
  };
  maxReviews?: number;
  hasProfileHeader?: boolean;
};
const tempreviews = [
  {
    id: 'eucj4y2BPU1GaxZe43zlF01xHYWQJZdtgqAvaCsw02jks',
    rating: 4.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
    category: 'Electronics',
  },
  {
    id: 'eucj4y2BPU1GaxZe43zlF01xHYWQJZdtgqAvaCsw02jks',
    rating: 4.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
    category: 'Electronics',
  },
  {
    id: 'eucj4y2BPU1GaxZe43zlF01xHYWQJZdtgqAvaCsw02jks',
    rating: 4.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
    category: 'Electronics',
  },
  {
    id: 'eucj4y2BPU1GaxZe43zlF01xHYWQJZdtgqAvaCsw02jks',
    rating: 4.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
    category: 'Electronics',
  },
  {
    id: 'eucj4y2BPU1GaxZe43zlF01xHYWQJZdtgqAvaCsw02jks',
    rating: 3.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
    category: 'Electronics',
  },
];

export const ReviewGrid: FunctionComponent<ReviewGridProps> = ({
  headerData,
  classNames,
  maxReviews,
  hasProfileHeader = true,
}) => {
  return (
    <div className={clsx('w-full flex flex-col gap-5', classNames?.containerClassName)}>
      {hasProfileHeader && (
        <div className={clsx('pl-5 mid-lg:pl-0', classNames?.headerContainerClassName)}>
          <ProfileCard {...headerData} />
        </div>
      )}

      <div
        className={clsx(
          'flex gap-[9px] overflow-x-auto scrollbar-thin scrollbar-none justify-start w-full px-5 mid-lg:px-0 md:gap-4',
          classNames?.gridClassName
        )}
      >
        {[...tempreviews, ...tempreviews].slice(0, maxReviews).map((review, i) => (
          <ReviewCard
            key={`${review.id}-i-${i}`}
            review={review}
            className={classNames?.cardClassName}
          />
        ))}
      </div>
    </div>
  );
};
