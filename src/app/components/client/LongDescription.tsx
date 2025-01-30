'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useRef, FunctionComponent } from 'react';

type LongDescriptionProps = {
  text: string;
  maxLines?: number;
  className?: string;
  scrollToTop?: boolean;
};

export const LongDescription: FunctionComponent<LongDescriptionProps> = ({
  text,
  maxLines = 3,
  className = '',
  scrollToTop = true,
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

    // Check on mount and window resize
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [maxLines, text]);

  const toggleExpansion = () => {
    if (isExpanded && scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsExpanded(!isExpanded);
  };

  const lineClamp = clsx({
    [`line-clamp-${maxLines}`]: !isExpanded,
    'line-clamp-none': isExpanded,
  });

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <p
        ref={contentRef}
        onClick={toggleExpansion}
        className={clsx('text-sm md:text-base text-gray-500 cursor-pointer', lineClamp)}
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
