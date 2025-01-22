import React, { FunctionComponent } from 'react';
import { StarRating } from '../StarRating';
import { Button } from '../../client/Button';
import { getDictionary } from '@/src/lib/dictionary';
import { SectionHeading } from './SectionHeading';
import { Divider } from './Divider';
import { VideoResponse } from '@/src/db/types';

type Props = {
  data: VideoResponse;
};

export const VideoDetails: FunctionComponent<Props> = async ({ data }) => {
  const { t } = await getDictionary();

  return (
    <div className="w-full flex flex-col md:max-w-[497px]">
      <section className="mb-5">
        <SectionHeading className="mb-2 ">
          {t('reviewSummary')} {data.product.productName}
        </SectionHeading>
        <p className="text-grey-700 font-normal text-base">{data.summary}</p>
      </section>

      <Divider />

      <section className=" my-5 md:pt-6 md:pb-8">
        <SectionHeading className="mb-4">{t('productDetails')}</SectionHeading>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-grey-700">{t('brandName')}</h3>
              <div className="text-grey-700">{data.brand.name}</div>
            </div>
            <div>
              <h3 className="text-grey-700">{t('productName')}</h3>
              <div className="text-grey-700">{data.product.productName}</div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-grey-700">{t('gtinEan')}</h3>
              <div className="text-grey-700">{data.product.globalTradeItemNumber ?? '-'}</div>
            </div>
            <div>
              <h3 className="text-grey-700">{t('vendorProductNumber')}</h3>
              <div className="text-grey-700">{data.product.vendorProductNumber ?? '-'}</div>
            </div>
          </div>
        </div>
      </section>
      <Divider className=" mb-5 md:mb-6" />

      <section>
        <SectionHeading className="mb-1.5">{t('productHighlights')}</SectionHeading>
        <div className="flex items-center gap-1 mb-4">
          <span className="font-medium text-grey-700">{data.starRating}</span>
          <div className="flex gap-0.5">
            <StarRating rating={data.starRating} showRating={false} />
          </div>
        </div>
      </section>

      <Divider className="my-5 md:my-6" />

      <section className="relative">
        <div className="absolute top-0 md:-top-20" id="whatReviewerThinks" />
        <SectionHeading>
          What{' '}
          {data.creator.name
            .split(' ')
            .map((part, index, arr) =>
              index === arr.length - 1 ? part.charAt(0) + '.' : part + ' '
            )
            .join('')}{' '}
          thinks
        </SectionHeading>
        <p className=" mt-1.5 text-grey-700">{data.transcript}</p>
      </section>

      <Divider className="my-5 md:my-8" />

      <section className="relative">
        <div className="absolute top-0 md:-top-20" id="faqs" />
        <SectionHeading className="mb-3">{t('frequentlyAskedQuestions')}</SectionHeading>
        <div className="space-y-4">
          {data.faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start gap-2">
                <h3 className="text-base font-bold text-grey-700">{faq.question}</h3>
              </div>
              <div>
                <p className="font-normal text-base text-grey-700 pb-4">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Button
        size="lg"
        className=" mt-5 mb-6 md:mt-8"
        aria-label={t('buyNow.ariaLabel')}
        href={
          data.product.productLink
            ? data.product.productLink.startsWith('http')
              ? data.product.productLink
              : `https://${data.product.productLink}`
            : ''
        }
        target={'_blank'}
      >
        {t('buyNow.label')}
      </Button>
    </div>
  );
};
