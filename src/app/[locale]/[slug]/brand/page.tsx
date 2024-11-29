import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PaginationContainer } from '@/src/app/components/client/PaginationContainer';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { BecomeReviewer } from '@/src/app/components/server/BecomeReviewer';
import { brands } from '@/src/app/components/server/BrandsSlider';
import { getDictionary } from '@/src/lib/dictionary';
import { Metadata, NextPage } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();

  return {
    title: t.all_brands_site_title,
    description: t.all_brands_meta_description,
  };
}

const Page: NextPage = async () => {
  const t = await getDictionary();
  return (
    <div className="w-full bg-white">
      <Filter />
      <div className=" w-full mx-auto  md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <h1 className=" text-lg md:text-2xl font-extrabold text-grey-700 mb-5 w-[calc(100%-70px)] md:w-full">
              Video Reviews: All Brands
            </h1>
            <LongDescription text={t.all_brands_body_text} />
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
          becomeReviewer={<BecomeReviewer />}
        />
        <section className=" max-w-[460px] mx-auto py-10 px-5 md:px-0">
          <h2 className="text-2xl font-extrabold text-grey-700 mb-4 md:text-center">
            SEO text lorem ipsum
          </h2>
          <p className="text-grey-700 text-base font-normal">{t.all_brands_footer_text}</p>
        </section>
      </div>
    </div>
  );
};

export default Page;
