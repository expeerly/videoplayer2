"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  totalStars?: number;
  onChange?: (rating: number) => void;
  editable?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  showRating?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  totalStars = 5,
  onChange,
  editable = false,
  size = "md",
  color = "#FFB800",
  showRating = true,
  className = "",
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [focusedStar, setFocusedStar] = useState<number | null>(null);

  // Size mapping for different star sizes
  const sizeMap = useMemo(
    () => ({
      sm: { star: 16, container: "h-4", text: "text-xs" },
      md: { star: 24, container: "h-6", text: "text-sm" },
      lg: { star: 32, container: "h-8", text: "text-base" },
    }),
    [],
  );

  // Handle mouse movement over the stars
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, starIndex: number) => {
      if (!editable) return;

      const { left, width } = event.currentTarget.getBoundingClientRect();
      const position = (event.clientX - left) / width;

      // Calculate rating with decimal precision
      const newRating = starIndex + position;

      setHoverRating(Math.round(newRating * 10) / 10); // Round to 1 decimal place
    },
    [editable],
  );

  // Handle mouse leave from the rating container
  const handleMouseLeave = useCallback(() => {
    setHoverRating(0);
  }, []);

  // Handle click on stars
  const handleStarClick = useCallback(
    (starIndex: number) => {
      if (!editable) return;
      const newRating = hoverRating || starIndex + 1;

      onChange?.(newRating);
    },
    [editable, hoverRating, onChange],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, starIndex: number) => {
      if (!editable) return;

      switch (event.key) {
        case " ":
        case "Enter":
          event.preventDefault();
          handleStarClick(starIndex);
          break;
        case "ArrowLeft":
          event.preventDefault();
          setFocusedStar(Math.max(0, starIndex - 1));
          break;
        case "ArrowRight":
          event.preventDefault();
          setFocusedStar(Math.min(totalStars - 1, starIndex + 1));
          break;
        case "Home":
          event.preventDefault();
          setFocusedStar(0);
          break;
        case "End":
          event.preventDefault();
          setFocusedStar(totalStars - 1);
          break;
      }
    },
    [editable, handleStarClick, totalStars],
  );

  // Calculate the fill percentage for partial stars
  const calculateStarFill = useCallback(
    (starIndex: number) => {
      const currentRating = hoverRating || rating;
      const starValue = starIndex + 1;

      if (currentRating >= starValue) return 1; // full star
      if (currentRating < starIndex) return 0; // empty star

      // partial star
      return currentRating - starIndex;
    },
    [hoverRating, rating],
  );

  // Render individual star
  const renderStar = useCallback(
    (index: number) => {
      const fillPercentage = calculateStarFill(index);
      const showPartialStar = fillPercentage > 0 && fillPercentage < 1;
      const showFullStar = fillPercentage === 1;
      const isFocused = focusedStar === index;

      return (
        <button
          key={`star-rating-${index}`}
          aria-checked={showFullStar}
          aria-label={`${index + 1} of ${totalStars} stars`}
          className={`relative inline-flex items-center justify-center focus:outline-none ${
            isFocused ? "ring-2 ring-offset-2 ring-blue-400" : ""
          }`}
          disabled={!editable}
          role="radio"
          tabIndex={editable ? 0 : -1}
          onBlur={() => setFocusedStar(null)}
          onClick={() => handleStarClick(index)}
          onFocus={() => setFocusedStar(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onMouseMove={(e) => handleMouseMove(e, index)}
        >
          {showFullStar ? (
            <Star
              className="transition-colors duration-200"
              color={color}
              fill={color}
              size={sizeMap[size].star}
            />
          ) : showPartialStar ? (
            <div className="relative">
              <Star
                className="absolute top-0 left-0"
                color={color}
                size={sizeMap[size].star}
              />
              <div
                className="relative overflow-hidden"
                style={{ width: `${fillPercentage * 100}%` }}
              >
                <Star color={color} fill={color} size={sizeMap[size].star} />
              </div>
            </div>
          ) : (
            <Star
              className="transition-colors duration-200"
              color={color}
              size={sizeMap[size].star}
            />
          )}
        </button>
      );
    },
    [
      calculateStarFill,
      color,
      editable,
      focusedStar,
      handleKeyDown,
      handleMouseMove,
      handleStarClick,
      size,
      sizeMap,
      totalStars,
    ],
  );

  // Format rating display
  const displayRating = useMemo(() => {
    const displayValue = hoverRating || rating;

    return displayValue.toFixed(1);
  }, [hoverRating, rating]);

  return (
    <div
      aria-label="Star rating"
      className={`flex items-center gap-1 ${sizeMap[size].container} ${className}`}
      role="radiogroup"
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(totalStars)].map((_, index) => renderStar(index))}
      {showRating && (
        <span
          aria-live="polite"
          className={`ml-2 ${sizeMap[size].text} text-gray-600`}
        >
          {displayRating}/{totalStars}
        </span>
      )}
    </div>
  );
};
