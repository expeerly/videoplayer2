import React, { FunctionComponent } from 'react';
import { Button } from '../client/Button';
import { getDictionary } from '@/src/lib/dictionary';

type Props = {
  isReviewer?: boolean;
};

export const BecomeReviewer: FunctionComponent<Props> = async ({ isReviewer }) => {
  const { t } = await getDictionary();

  const heading = isReviewer
    ? t('CTABlockAllReviewers.experienceShare')
    : t('cta_block_all_brands_categories.title');
  const desc = isReviewer
    ? t('CTABlockAllReviewers.becomeReviewer')
    : t('cta_block_all_brands_categories.desc');
  const button = {
    label: isReviewer ? t('CTABlockAllReviewers.learnMore') : t('learn_more.label'),
    ariaLabel: isReviewer
      ? t('CTABlockAllReviewers.learnMore_arialabel')
      : t('learn_more.aria_label'),
  };

  return (
    <section className="py-8">
      <div className="w-full bg-blue-500 px-6 py-8">
        <div className="text-white text-center space-y-1 px-14 md:px-0">
          <h2 className="text-2xl font-extrabold">{heading}</h2>
          <p className="text-base font-normal">{desc}</p>
        </div>

        <Button
          size="lg"
          variant="secondary"
          className="w-full bg-white mt-6 mx-auto sm:w-[300px] text-[#111827]"
          aria-label={button.ariaLabel}
          href={
            isReviewer
              ? 'https://www.get.expeerly.com/become-a-creator'
              : 'https://www.get.expeerly.com/for-brands'
          }
          target="_blank"
        >
          {button.label}
        </Button>
      </div>
    </section>
  );
};
