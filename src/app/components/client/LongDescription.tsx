'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';

type LongDescriptionProps = {
  text: string;
  maxLines?: number;
  className?: string;
};

export const LongDescription: FunctionComponent<LongDescriptionProps> = ({
  text,
  maxLines = 3,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const t = useTranslations();

  useEffect(() => {
    const checkOverflow = () => {
      const element = contentRef.current;
      if (!element) return;

      const style = window.getComputedStyle(element);
      const lineHeight = parseInt(style.lineHeight);
      const height = element.offsetHeight;

      const hasOverflow = height > lineHeight * maxLines;
      setShouldShowButton(hasOverflow);
    };

    // Check on mount
    checkOverflow();
  }, [maxLines, text]);

  const toggleExpansion = () => {
    if (isExpanded) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <p
        ref={contentRef}
        onClick={shouldShowButton ? toggleExpansion : undefined}
        className={clsx(
          'text-sm md:text-base text-gray-500',
          shouldShowButton && 'cursor-pointer',
          !isExpanded && shouldShowButton && 'line-clamp-3'
        )}
      >
        {text}
        {shouldShowButton && (
          <b className="inline-flex items-center text-black ml-1">
            {isExpanded ? t('less') : t('more')}
          </b>
        )}
      </p>
    </div>
  );
};
