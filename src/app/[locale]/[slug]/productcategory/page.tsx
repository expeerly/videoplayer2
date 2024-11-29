import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PaginationContainer } from '@/src/app/components/client/PaginationContainer';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { BecomeReviewer } from '@/src/app/components/server/BecomeReviewer';
import { NextPage } from 'next';

const sampleText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut 
perspiciatis unde omnis iste natus error sit voluptatem accusantium 
doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
veritatis et quasi architecto beatae vitae dicta sunt explicabo.
`.trim();

const Page: NextPage = () => {
  return (
    <div className="w-full bg-white">
      <Filter />
      <div className="w-full mx-auto md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <h1 className=" text-lg md:text-2xl font-extrabold text-grey-700 mb-5 w-[calc(100%-70px)] md:w-full">
              Avis Vidéos: Categories de Produit
            </h1>
            <LongDescription text={sampleText} />
          </div>
          <div className="mt-8">
            <div className="hidden md:block">
              <Slider
                classNameStyle={{
                  cardClassName: 'bg-white',
                }}
              />
            </div>
            <div className="md:hidden">
              <MobileSlider isMultiRow={false} />
            </div>
          </div>
        </section>
        <PaginationContainer
          headerData={{
            profileSlug: '/video-reviews/productcategory/travel',
            title: 'Travel',
            subTitle: '1,218 reviews',
            dataType: 'category',
            description: '',
          }}
          becomeReviewer={<BecomeReviewer />}
        />
        <section className="max-w-[460px] mx-auto py-10 px-5 md:px-0">
          <h2 className="text-2xl font-extrabold text-grey-700 mb-4 md:text-center ">
            SEO text lorem ipsum
          </h2>
          <p className="text-grey-700 text-base font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium dictum felis, at
            porttitor nisi accumsan et. Curabitur volutpat risus at nisi finibus, eget suscipit leo.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Page;
