import { StarIcon } from '@/src/assets/icons';
import React, { FunctionComponent } from 'react';

type StarRatingProps = {
  rating?: number;
  totalStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
  className?: string;
};

type SizeMapType = {
  [K in 'sm' | 'md' | 'lg']: {
    container: string;
    text: string;
  };
};

export const StarRating: FunctionComponent<StarRatingProps> = ({
  rating = 0,
  totalStars = 5,
  size = 'md',
  showRating = true,
  className = '',
}) => {
  const sizeMap: SizeMapType = {
    sm: { container: 'h-4', text: 'text-xs' },
    md: { container: 'h-6', text: 'text-sm' },
    lg: { container: 'h-8', text: 'text-base' },
  };

  const calculateStarFill = (starIndex: number) => {
    const starValue = starIndex + 1;
    if (rating >= starValue) return 1;
    if (rating < starIndex) return 0;
    return rating - starIndex;
  };

  const renderStar = (index: number) => {
    const fillPercentage = calculateStarFill(index);
    const showPartialStar = fillPercentage > 0 && fillPercentage < 1;
    const showFullStar = fillPercentage === 1;

    return (
      <div key={index} className="relative inline-block">
        {showFullStar ? (
          <StarIcon className={`[&>path]:stroke-yellow-500 [&>path]:fill-yellow-500`} />
        ) : showPartialStar ? (
          <div className="relative">
            <StarIcon
              className={`absolute top-0 left-0 [&>path]:fill-gray-400 [&>path]:stroke-gray-400`}
            />
            <div className="relative overflow-hidden" style={{ width: `${fillPercentage * 100}%` }}>
              <StarIcon className={`[&>path]:stroke-yellow-500 [&>path]:fill-yellow-500`} />
            </div>
          </div>
        ) : (
          <StarIcon className="[&>path]:fill-gray-400 [&>path]:stroke-gray-400" />
        )}
      </div>
    );
  };

  return (
    <div className={`flex items-center gap-1 ${sizeMap[size].container} ${className}`}>
      {[...Array(totalStars)].map((_, index) => renderStar(index))}
      {showRating && (
        <span className={`ml-2 ${sizeMap[size].text} text-gray-600`}>
          {rating.toFixed(1)}/{totalStars}
        </span>
      )}
    </div>
  );
};
