'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations();
  useEffect(() => {
    if (text.length > maxLength) {
      setShouldShowButton(true);
    }
  }, [text, maxLength]);

  const toggleExpansion = useCallback(() => {
    setIsExpanded(prev => {
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
      <p
        onClick={toggleExpansion}
        className={clsx('text-sm md:text-base text-gray-500 cursor-pointer', {
          hidden: isExpanded,
        })}
      >
        {displayText}
        {!isExpanded && shouldShowButton && '...'}
        {shouldShowButton && (
          <b className="inline-flex items-center  text-black ml-1">{t('more')}</b>
        )}
      </p>

      <p
        onClick={toggleExpansion}
        className={clsx('text-sm md:text-base text-gray-500 cursor-pointer', {
          hidden: !isExpanded,
          block: isExpanded,
        })}
      >
        {text}
        {shouldShowButton && <b className="inline-flex items-center  text-black">{t('less')}</b>}
      </p>
    </div>
  );
};
