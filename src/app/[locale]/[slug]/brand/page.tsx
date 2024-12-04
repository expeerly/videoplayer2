import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { brands } from '@/src/app/components/server/BrandsSlider';
import { getDictionary } from '@/src/lib/dictionary';
import { Metadata, NextPage } from 'next';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { SEOSection } from '@/src/app/components/server/SEOSection';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();

  return {
    title: t('all_brands_site_title'),
    description: t('all_brands_meta_description'),
  };
}

const Page: NextPage = async () => {
  const { t } = await getDictionary();
  return (
    <div className="w-full bg-white">
      <div className=" w-full mx-auto  md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex justify-between">
              <PageHeading>Video Reviews: All Brands</PageHeading>
              <Filter />
            </div>
            <LongDescription text={t('all_brands_body_text')} />
          </div>
          <div className="mt-8">
            <div className="hidden md:block">
              <Slider
                slides={brands}
                classNameStyle={{
                  cardClassName: 'bg-white',
                }}
                isBrand
              />
            </div>
            <div className="md:hidden">
              <MobileSlider isMultiRow={false} slides={brands} isBrand />
            </div>
          </div>
        </section>
        <PaginationContainer
          headerData={{
            title: 'Dyson',
            subTitle: '1,218 reviews',
            rating: 4.5,
            variant: 'primary',
            imageUrl: '/brands/logo.svg',
            profileSlug: '/video-reviews/brand/dyson',
            dataType: 'brand',
            description: '',
          }}
          ctaBlock={{
            heading: t('cta_block_all_brands_categories.title'),
            desc: t('cta_block_all_brands_categories.desc'),
            button: {
              label: t('learn_more.label'),
              ariaLabel: t('learn_more.aria_label'),
              href: 'https://www.get.expeerly.com/for-brands',
            },
          }}
        />

        <SEOSection heading="SEO text lorem ipsum" content={t('all_brands_footer_text')} />
      </div>
    </div>
  );
};

export default Page;
