import React, { FunctionComponent } from 'react';
import { ReviewCard } from '../client/ReviewCard';
import { ProfileCard, ProfileCardProps } from '../client/ProfileCard';
import clsx from 'clsx';

type ReviewGridProps = {
  headerData?: ProfileCardProps;
  classNames?: {
    containerClassName?: string;
    cardClassName?: string;
    gridClassName?: string;
  };
  maxReviews?: number;
};
const tempreviews = [
  {
    id: 1,
    rating: 4.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
  },
  {
    id: 2,
    rating: 4.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
  },
  {
    id: 3,
    rating: 4.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
  },
  {
    id: 4,
    rating: 4.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
  },
  {
    id: 5,
    rating: 3.5,
    view: 1200,
    brand: 'TechGurau',
    productName: 'Smartphone XYZ',
  },
];

export const ReviewGrid: FunctionComponent<ReviewGridProps> = ({
  headerData,
  classNames,
  maxReviews,
}) => {
  return (
    <div className={clsx('w-full flex flex-col gap-5', classNames?.containerClassName)}>
      <div className="pl-5 mid-lg:pl-0">
        <ProfileCard {...headerData} />
      </div>

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
