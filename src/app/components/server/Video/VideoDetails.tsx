import React, { FunctionComponent } from 'react';
import { StarRating } from '../StarRating';
import { Button } from '../../client/Button';
import { getDictionary } from '@/src/lib/dictionary';
import { SectionHeading } from './SectionHeading';
import { Divider } from './Divider';

const faqs = [
  {
    question: 'How is the Dyson Airwrap Multi-Styler packaged?',
    answer:
      'The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.',
  },
  {
    question: 'How is the Dyson Airwrap Multi-Styler packaged?',
    answer:
      'The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.',
  },
  {
    question: 'How is the Dyson Airwrap Multi-Styler packaged?',
    answer:
      'The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.',
  },
  {
    question: 'How is the Dyson Airwrap Multi-Styler packaged?',
    answer:
      'The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.',
  },
  {
    question: 'How is the Dyson Airwrap Multi-Styler packaged?',
    answer:
      'The Dyson Airwrap Multi-Styler comes carefully and elegantly packaged in a high-quality box, ensuring that all contents are well-protected during transit and storage.',
  },
];

const videoDetails = {
  videoTitle: `Discover Mary's Dyson Airwrap Multi-Styler Review: Effortless Hair
          Styling Made Stunningly Simple!`,
  summary: ` The Dyson Airwrap Multi-Styler impresses with its elegant packaging,
            versatile attachments, user-friendly operation, and quick hair
            styling capabilities. Tester Patty highlights its ability to create
            various hairstyles, control curl sizes, and expedite morning
            routines. It's an ideal choice for individuals who enjoy
            experimenting with different hairstyles without compromising hair
            health or spending excessive time styling.`,
  brandName: `Dyson`,
  productName: `Airwrap Multi-Styler`,
  gtin: '5025155071458',
  vendorProductNo: 'H505',
  rating: 4.5,
  reviwerName: 'Marisa C.',
  whatReviewerThinks: ` Hello, I'm Marisa, and I had the opportunity to test for expeerly
            the Dyson Airwrap Multi-Styler for long hair The first thing I
            noticed is how carefully and elegantly everything is packaged
            Everything comes in a high-quality box that protects the contents
            really well It comes with various attachments that you can use to
            style your hair I especially like that it has two different-sized
            curlers which allow you to determine the size of the curls You can
            directly set the direction in which the hair is wrapped by turning a
            small wheel The usage is really easy and it's super quick to achieve
            beautiful curls With the brush attachment that is also included you
            can blow-dry your hair straight and it's dry within minutes It makes
            the morning preparation really fast, especially after showering I
            would recommend this hairdryer to anyone who likes to try out
            different hairstyles but doesn't want to damage their hair with heat
            or spend too much time on it.`,
};

export const VideoDetails: FunctionComponent = async () => {
  const { t } = await getDictionary();

  return (
    <div className="w-full flex flex-col md:max-w-[497px]">
      <section className=" pt-7 mb-5 md:py-8 ">
        <SectionHeading className="mb-2 ">
          {t('reviewSummary')} {`{{productname}}`}
        </SectionHeading>
        <p className="text-grey-700 font-normal text-base">{videoDetails?.summary}</p>
      </section>

      <Divider />

      <section className=" my-5 md:pt-6 md:pb-8">
        <SectionHeading className="mb-4">{t('productDetails')}</SectionHeading>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-grey-500">{t('brandName')}</h3>
              <div className="text-grey-700">{videoDetails.brandName}</div>
            </div>
            <div>
              <h3 className="text-grey-500">{t('productName')}</h3>
              <div className="text-grey-700">{videoDetails.productName}</div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-grey-500">{t('gtinEan')}</h3>
              <div className="text-grey-700">{videoDetails.gtin}</div>
            </div>
            <div>
              <h3 className="text-grey-500">{t('vendorProductNumber')}</h3>
              <div className="text-grey-700">{videoDetails.vendorProductNo}</div>
            </div>
          </div>
        </div>
      </section>
      <Divider className=" mb-5 md:mb-6" />

      <section>
        <SectionHeading className="mb-1.5">{t('productHighlights')}</SectionHeading>
        <div className="flex items-center gap-1 mb-4">
          <span className="font-medium text-grey-700">{videoDetails.rating}</span>
          <div className="flex gap-0.5">
            <StarRating rating={videoDetails.rating} showRating={false} />
          </div>
        </div>
      </section>

      <Divider className="my-5 md:my-6" />

      <section className="relative">
        <div className="absolute top-0 md:-top-20" id="whatReviewerThinks" />
        <SectionHeading>What {videoDetails.reviwerName} thinks</SectionHeading>
        <p className=" mt-1.5 text-grey-700">{videoDetails.whatReviewerThinks}</p>
      </section>

      <Divider className="my-5 md:my-8" />

      <section className="relative">
        <div className="absolute top-0 md:-top-20" id="faqs" />
        <SectionHeading className="mb-3">{t('frequentlyAskedQuestions')}</SectionHeading>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
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

      <Button size="lg" className=" mt-5 mb-6 md:mt-8" aria-label={t('buyNow.ariaLabel')}>
        {t('buyNow.label')}
      </Button>
    </div>
  );
};
