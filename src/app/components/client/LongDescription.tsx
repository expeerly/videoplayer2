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
    setIsExpanded(prev => !prev);
  }, []);

  const truncatedText = useMemo(() => text.slice(0, maxLength), [text, maxLength]);
  const displayText = useMemo(
    () => (isExpanded ? text : truncatedText),
    [isExpanded, truncatedText, text]
  );

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <p className="text-base leading-relaxed text-grey-500">
        {displayText}
        {!isExpanded && shouldShowButton && '...'}
        {shouldShowButton && (
          <button
            onClick={toggleExpansion}
            className="inline-flex items-center font-bold text-black"
          >
            {isExpanded ? <>less</> : <>more</>}
          </button>
        )}
      </p>
    </div>
  );
};
