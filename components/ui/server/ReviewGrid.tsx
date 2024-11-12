import React, { FunctionComponent } from 'react';
import { ReviewCard } from './ReviewCard';
import { ProfileCard, ProfileCardProps } from './ProfileCard';

type ReviewGridProps = {
  headerData?: ProfileCardProps;
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

export const ReviewGrid: FunctionComponent<ReviewGridProps> = ({ headerData }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="pl-5 mid-lg:pl-0">
        <ProfileCard {...headerData} />
      </div>

      <div className="flex gap-[15px] overflow-x-auto scrollbar-thin scrollbar-none justify-start w-full px-5 mid-lg:px-0">
        {tempreviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};
