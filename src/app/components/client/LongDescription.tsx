'use client';
import React, { useState, useEffect, FunctionComponent, useMemo, useCallback } from 'react';

type LongDescriptionProps = {
  text: string;
  maxLength?: number;
  className?: string;
};

export const LongDescription: FunctionComponent<LongDescriptionProps> = ({
  text,
  maxLength = 150,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);

  useEffect(() => {
    if (text.length > maxLength) {
      setShouldShowButton(true);
    }
  }, [text, maxLength]);

  const toggleExpansion = useCallback(() => {
    setIsExpanded(prev => {
      // If we're closing the expanded view, scroll to top
      if (prev) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return !prev;
    });
  }, []);

  const truncatedText = useMemo(() => text.slice(0, maxLength), [text, maxLength]);
  const displayText = useMemo(
    () => (isExpanded ? text : truncatedText),
    [isExpanded, truncatedText, text]
  );

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <p onClick={toggleExpansion} className="text-sm md:text-base text-gray-500 cursor-pointer">
        {displayText}
        {!isExpanded && shouldShowButton && '...'}
        {shouldShowButton && (
          <button
            className="inline-flex items-center font-bold text-black ml-1 hover:text-gray-700 transition-colors"
            aria-label={isExpanded ? 'Show less text' : 'Show more text'}
          >
            {isExpanded ? 'less' : 'more'}
          </button>
        )}
      </p>
    </div>
  );
};
