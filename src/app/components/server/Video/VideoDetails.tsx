import React, { FunctionComponent } from 'react';
import { VideoCard } from './VideoCard';
import { StarRating } from '../StarRating';
import { PageHeading } from '../PageHeading';
import { Button } from '../../client/Button';
import { ReviewGrid } from '../ReviewGrid';
import { getDictionary } from '@/src/lib/dictionary';

const videoData = {
  id: '1',
  playbackId: 'eucj4y2BPU1GaxZe43zlF01xHYWQJZdtgqAvaCsw02jks',
  caption: '🚴‍♂️ Epic mountain biking trails! #mtb #adventure',
  username: 'adventu',
  likes: 15420,
  comments: 234,
  shares: 89,
  userAvatar: '/avatars/user1.jpg',
  category: 'Adventure',
  brandName: 'Dyson',
  productName: 'Supersonic',
};

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
    <div className="w-full items-center flex flex-col md:w-max md:mx-auto">
      <div className="flex w-full h-max md:h-[calc(100vh-120px)] ">
        <VideoCard isVisible key={videoData.id} video={videoData} />
      </div>
      <div className="w-full px-5 flex flex-col md:max-w-[450px] mx-auto pt-7 md:pt-2 md:px-0">
        <section>
          <PageHeading>
            Discover Mary’s Dyson Airwrap Multi-Styler Review: Effortless Hair Styling Made
            Stunningly Simple!
          </PageHeading>
          <div className="flex gap-3 mt-8 flex-wrap mobileM:flex-nowrap">
            <Button
              aria-label={t('review.aria_label')}
              size="lg"
              className="w-full text-sm px-6 mobileM:w-max"
            >
              {t('review.label')}
            </Button>
            <Button size="lg" variant="outline" className="w-full text-sm px-6 mobileM:w-max">
              FAQS & Product Details
            </Button>
          </div>
        </section>
        <section className=" pt-7 mb-5 md:py-8 ">
          <h4 className="text-2xl text-[#080218] font-medium mb-2">
            {t('reviewSummary')} {`{{productname}}`}
          </h4>
          <p className="text-[#080218] font-normal text-base">{videoDetails.summary}</p>
        </section>

        <hr className=" border-gray-200" />

        <section className=" my-5 md:pt-6 md:pb-8">
          <h2 className="text-2xl font-medium mb-4">{t('productDetails')}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-6">
              <div>
                <div className="text-[#707070] font-bold">{t('brandName')}</div>
                <div className="text-[#080218]">{videoDetails.brandName}</div>
              </div>
              <div>
                <div className="text-[#707070] font-bold">{t('productName')}</div>
                <div className="text-[#080218]">{videoDetails.productName}</div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="text-[#707070] font-bold">{t('gtinEan')}</div>
                <div className="text-[#080218]">{videoDetails.gtin}</div>
              </div>
              <div>
                <div className="text-[#707070] font-bold">{t('vendorProductNumber')}</div>
                <div className="text-[#080218]">{videoDetails.vendorProductNo}</div>
              </div>
            </div>
          </div>
        </section>
        <hr className=" mb-5 md:mb-6 border-gray-200" />

        <section>
          <h2 className="text-2xl font-medium mb-1.5">{t('productHighlights')}</h2>
          <div className="flex items-center gap-1 mb-4">
            <span className="font-medium text-[#0E0E0F]">{videoDetails.rating}</span>
            <div className="flex gap-0.5">
              <StarRating rating={videoDetails.rating} showRating={false} />
            </div>
          </div>

          <div className="space-y-1 text-[#080218]">
            <h3>Pros</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                Fast styling
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                Silent
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black" />
                Simple to use
              </li>
            </ul>
          </div>
        </section>

        <hr className="my-5 md:my-6 border-gray-200" />

        <section>
          <h1 className="font-medium text-2xl text-[#080218]">What Marisa thinks</h1>
          <p className="text-[#080218] mt-1.5">{videoDetails.whatReviewerThinks}</p>
        </section>

        <hr className="my-5 md:my-8 border-gray-200" />

        <section>
          <h2 className="text-2xl font-medium mb-1.5">{t('frequentlyAskedQuestions')}</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#080218] mt-2" />
                  <h3 className="text-base font-bold text-[#080218]">{faq.question}</h3>
                </div>
                <div className="pl-3.5">
                  <p className="font-normal text-sm text-[#080218] pb-4">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Button size="lg" className=" mt-5 mb-6 md:mt-8" aria-label={t('buyNow.ariaLabel')}>
          {t('buyNow.label')}
        </Button>
      </div>
      <div className="flex w-full justify-center flex-col gap-6 mb-16 md:mx-auto">
        <h1 className="px-5 text-left font-extrabold text-2xl text-[#0E0E0F] w-full md:text-center">
          {t('moreVideosOn')} the Airwrap Styler
        </h1>
        <ReviewGrid
          hasProfileHeader={false}
          classNames={{
            gridClassName: '!gap-[15px] md:justify-center',
          }}
          maxReviews={3}
        />
      </div>
    </div>
  );
};
