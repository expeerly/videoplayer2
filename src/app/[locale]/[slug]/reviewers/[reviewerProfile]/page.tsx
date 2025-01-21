import { getCategories, getProfile } from '@/src/app/actions/actions';
import { Button } from '@/src/app/components/client/Button';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { Avatar } from '@/src/app/components/server/Avatar';
import { ReviewGrid } from '@/src/app/components/server/ReviewGrid';
import { ShareIcon } from '@/src/assets/icons';
import { Languages } from '@/src/db/types';
import { getDictionary } from '@/src/lib/dictionary';
import { NextPage } from 'next';

const sampleText = `
Dyson technology. Solving the problems others ignore. Be the first to know about our latest releases, so you can enjoy discounts and other perks. Tempor amet in integer diam interdum. Amet rhoncus pellentesque lacus quam nunc nunc nec elit. Urna semper donec fermentum blandit lorem vel ut ullamcorper malesuada.
`.trim();

type PageProps = {
  params: Promise<{
    locale: Languages;
    slug: string;
    reviewerProfile: string;
  }>;
};

const Page: NextPage<PageProps> = async ({ params }) => {
  const { locale, reviewerProfile } = await params;
  const { t } = await getDictionary();

  const { data: categories } = await getCategories(locale);
  const { data } = await getProfile({
    lang: locale,
    gridType: 'creator',
    id: reviewerProfile,
  });

  const slides = categories
    .filter(category =>
      data.interests.some(interest => interest.categoryId === Number(category.id))
    )
    .map(i => ({
      name: i.categoryName,
      icon: i.logo,
      slug: i.urlSlug,
    }));

  return (
    <div className="w-full bg-white">
      <div className="px-5 w-full mx-auto md:max-w-[716px] pt-5 md:pt-10 lg:px-0">
        <section>
          <div className="flex gap-4">
            <Avatar
              className="flex h-[50px] w-[50px] md:h-28 md:w-28 md:m-0"
              alt={data.name}
              src={data.logo}
            />
            <div className="flex flex-1 flex-col gap-1">
              <h1 className=" text-lg md:text-2xl font-extrabold text-grey-700 ">{data.name}</h1>
              <div className="mb-3">
                <p className="text-grey-500">
                  {data.age} {data.location}
                </p>
              </div>
              <div className="hidden md:block">
                <LongDescription text={data.bio!} />
              </div>
            </div>
            <div
              className={
                'flex flex-col gap-0.5 md:absolute md:m-0 md:top-10 md:right-8 mid-lg:right-12'
              }
            >
              <Button
                isOnlyIcon
                variant="secondary"
                type="button"
                aria-haspopup="true"
                title="Show/Hide Menu"
                id="menu-button"
                className=" !p-0.5 z-30 max-h-10 max-w-10 ml-auto md:h-12 md:w-12 flex justify-center items-center"
              >
                <ShareIcon />
              </Button>
              <p className="text-grey-700 text-xs font-bold">Share</p>
            </div>
          </div>
          <div className=" md:hidden">
            <LongDescription text={sampleText} />
          </div>
        </section>

        <section className="pt-5 md:pt-[50px]">
          <h3 className="text-lg font-extrabold mb-4 text-grey-700 md:hidden">{t('interests')}</h3>
          <div className="hidden md:block">
            <Slider slides={slides} />
          </div>
          <div className="md:hidden">
            <MobileSlider slides={slides} />
          </div>
        </section>

        <section className=" py-7 md:py-[50px]">
          <ReviewGrid
            classNames={{
              gridClassName: 'flex-wrap !gap-4 !px-0',
              cardClassName:
                'min-w-[167px] w-[167px] mobileS:min-w-[167px] mobileS:w-[167px] mobileM:min-w-[167px] mobileM:w-[167px] mobileL:min-w-[167px] mobileL:w-[167px] mid-tablet:min-w-[167px] mid-tablet:w-[167px] sm:min-w-[167px] sm:w-[167px] md:min-w-[167px] md:w-[167px] md:max-w-[167px]',
            }}
            data={data}
            hasProfileHeader={false}
          />
        </section>
      </div>
    </div>
  );
};

export default Page;
