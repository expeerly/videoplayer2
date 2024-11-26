'use client';
import React, { FunctionComponent } from 'react';
import { Button } from './Button';
import { useTranslations } from 'next-intl';

export const BecomeReviewer: FunctionComponent = () => {
  const t = useTranslations();

  return (
    <section className="py-8">
      <div className="w-full bg-blue-500 px-6 py-8">
        <div className="text-white text-center space-y-1 px-14 md:px-0">
          <h2 className="text-2xl font-extrabold">{t('cta_block_all_brands_categories.title')}</h2>
          <p className="text-base font-normal">{t('cta_block_all_brands_categories.desc')}</p>
        </div>

        <Button
          size="lg"
          variant="secondary"
          className="w-full bg-white mt-6 mx-auto sm:w-[300px] text-[#111827]"
          aria-label={t('learn_more.aria_label')}
        >
          {t('learn_more.label')}
        </Button>
      </div>
    </section>
  );
};
