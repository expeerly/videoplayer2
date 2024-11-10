import { StarIcon } from '@/assets/icons';
import React, { FunctionComponent } from 'react';

type StarRatingProps = {
  rating?: number;
  totalStars?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
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
  color = '#FFB800',
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
    const grayColor = '#D1D5DB'; // Tailwind gray-300 equivalent

    return (
      <div key={index} className="relative inline-block">
        {showFullStar ? (
          <StarIcon fill={color} color={color} />
        ) : showPartialStar ? (
          <div className="relative">
            <StarIcon color={grayColor} fill={grayColor} className="absolute top-0 left-0" />
            <div className="relative overflow-hidden" style={{ width: `${fillPercentage * 100}%` }}>
              <StarIcon fill={color} color={color} />
            </div>
          </div>
        ) : (
          <StarIcon color={grayColor} fill={grayColor} />
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
