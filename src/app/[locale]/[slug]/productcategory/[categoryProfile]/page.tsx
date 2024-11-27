import { Button } from '@/src/app/components/client/Button';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PaginationContainer } from '@/src/app/components/client/PaginationContainer';
import { Avatar } from '@/src/app/components/server/Avatar';
import { ShareIcon } from '@/src/assets/icons';
import { NextPage } from 'next';

const sampleText = `
Dyson technology. Solving the problems others ignore. Be the first to know about our latest releases, so you can enjoy discounts and other perks. Tempor amet in integer diam interdum. Amet rhoncus pellentesque lacus quam nunc nunc nec elit. Urna semper donec fermentum blandit lorem vel ut ullamcorper malesuada.
`.trim();

const Page: NextPage = () => {
  return (
    <div className="w-full bg-white">
      <div className=" w-full mx-auto  md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex gap-4 mb-6">
              <Avatar className="my-auto flex h-10 w-10 md:h-14 md:w-14 md:m-0" alt="Dyson" />
              <div className="flex flex-1 flex-col gap-0.5 md:gap-3">
                <h1 className="t text-lg md:text-2xl font-extrabold text-grey-700 sm:w-[calc(100%-70px)] md:w-[90%]">
                  Beauty & Personal Care Video Reviews
                </h1>

                <p className="text-gray-500">{'1,218 reviews'}</p>
              </div>
              <div
                className={
                  'flex flex-col gap-0.5 justify-center items-center md:absolute md:m-0 md:top-10 md:right-12'
                }
              >
                <Button
                  isOnlyIcon
                  variant="secondary"
                  type="button"
                  aria-haspopup="true"
                  title="Show/Hide Menu"
                  id="menu-button"
                  className=" !p-0.5 z-30 max-h-10 max-w-10 ml-auto  md:h-12 md:w-12 flex justify-center items-center"
                >
                  <ShareIcon />
                </Button>
                <p className="text-grey-600 text-xs font-bold">Share</p>
              </div>
            </div>
            <LongDescription text={sampleText} />
          </div>
        </section>
        <PaginationContainer
          headerData={{
            title: 'Dyson  Headphones',
            subTitle: '(1,218)',
            rating: 4.5,
            variant: 'secondary',
            imageUrl: '/brands/logo.svg',
            profileSlug: '/video-reviews/brand/dyson',
            description: '',
            dataType: 'category',
          }}
          isBecomeReviewer={false}
        />
        <section className="text-center max-w-[460px] mx-auto py-10">
          <h2 className="text-2xl font-extrabold text-grey-700 mb-4">SEO text lorem ipsum</h2>
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
