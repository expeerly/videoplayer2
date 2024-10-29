import React, { useState, useCallback, useMemo } from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  totalStars?: number;
  onChange?: (rating: number) => void;
  editable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  showRating?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  totalStars = 5,
  onChange,
  editable = false,
  size = 'md',
  color = '#FFB800',
  showRating = true,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  // Size mapping for different star sizes
  const sizeMap = useMemo(() => ({
    sm: { star: 16, container: 'h-4', text: 'text-xs' },
    md: { star: 24, container: 'h-6', text: 'text-sm' },
    lg: { star: 32, container: 'h-8', text: 'text-base' }
  }), []);

  // Handle mouse movement over the stars
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    if (!editable) return;

    const { left, width } = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - left) / width;
    
    // Calculate rating with decimal precision
    const newRating = starIndex + position;
    setHoverRating(Math.round(newRating * 10) / 10); // Round to 1 decimal place
  }, [editable]);

  // Handle mouse leave from the rating container
  const handleMouseLeave = useCallback(() => {
    setHoverRating(0);
  }, []);

  // Handle click on stars
  const handleClick = useCallback(() => {
    if (!editable || !hoverRating) return;
    onChange?.(hoverRating);
  }, [editable, hoverRating, onChange]);

  // Calculate the fill percentage for partial stars
  const calculateStarFill = useCallback((starIndex: number) => {
    const currentRating = hoverRating || rating;
    const starValue = starIndex + 1;
    
    if (currentRating >= starValue) return 1; // full star
    if (currentRating < starIndex) return 0; // empty star
    
    // partial star
    return currentRating - starIndex;
  }, [hoverRating, rating]);

  // Render individual star
  const renderStar = useCallback((index: number) => {
    const fillPercentage = calculateStarFill(index);
    const showPartialStar = fillPercentage > 0 && fillPercentage < 1;
    const showFullStar = fillPercentage === 1;
    
    return (
      <div
        key={index}
        className="relative inline-block"
        onMouseMove={(e) => handleMouseMove(e, index)}
        onClick={handleClick}
      >
        {showFullStar ? (
          <Star
            size={sizeMap[size].star}
            fill={color}
            color={color}
            className="transition-colors duration-200"
          />
        ) : showPartialStar ? (
          <div className="relative">
            <Star
              size={sizeMap[size].star}
              color={color}
              className="absolute top-0 left-0"
            />
            <div className="relative overflow-hidden" style={{ width: `${fillPercentage * 100}%` }}>
              <Star
                size={sizeMap[size].star}
                fill={color}
                color={color}
              />
            </div>
          </div>
        ) : (
          <Star
            size={sizeMap[size].star}
            color={color}
            className="transition-colors duration-200"
          />
        )}
      </div>
    );
  }, [calculateStarFill, color, handleClick, handleMouseMove, size, sizeMap]);

  // Format rating display
  const displayRating = useMemo(() => {
    const displayValue = hoverRating || rating;
    return displayValue.toFixed(1);
  }, [hoverRating, rating]);

  return (
    <div 
      className={`flex items-center gap-1 ${sizeMap[size].container} ${editable ? 'cursor-pointer' : 'cursor-default'} ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(totalStars)].map((_, index) => renderStar(index))}
      {showRating && (
        <span className={`ml-2 ${sizeMap[size].text} text-gray-600`}>
          {displayRating}/{totalStars}
        </span>
      )}
    </div>
  );
};
