'use client';
import { useTranslations } from 'next-intl';
import React, { FunctionComponent, PropsWithChildren, useCallback } from 'react';
import { Button } from './Button';

export const ScrollToSection: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const t = useTranslations();

  const scrollToElement = useCallback((elementId: string) => {
    try {
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({
          block: 'start',
        });
      }
    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  }, []);

  const faqButtonHandler = useCallback(() => {
    scrollToElement('faqs');
  }, [scrollToElement]);

  const reviewButtonHandler = useCallback(() => {
    scrollToElement('whatReviewerThinks');
  }, [scrollToElement]);

  return (
    <section>
      {children}
      <div className="flex gap-3 mt-8 flex-wrap mobileM:flex-nowrap">
        <Button
          onClick={reviewButtonHandler}
          aria-label={t('review.aria_label')}
          size="lg"
          className="w-full text-sm px-6 mobileM:w-max"
        >
          {t('review.label')}
        </Button>
        <Button
          onClick={faqButtonHandler}
          size="lg"
          variant="outline"
          className="w-full text-sm px-6 mobileM:w-max"
        >
          FAQS & Product Details
        </Button>
      </div>
    </section>
  );
};
