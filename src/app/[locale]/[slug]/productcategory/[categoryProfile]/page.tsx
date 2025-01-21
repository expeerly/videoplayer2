import { Button } from '@/src/app/components/client/Button';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { Avatar } from '@/src/app/components/server/Avatar';
import { ShareIcon } from '@/src/assets/icons';
import { Metadata, NextPage } from 'next';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { Languages } from '@/src/db/types';
import { getPageInfo } from '@/src/app/actions/actions';
import { ProfileGrid } from '../../../../components/server/ProfileGrid';

type PageProps = {
  params: Promise<{
    locale: Languages;
    slug: string;
    categoryProfile: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, categoryProfile } = await params;
  const { data } = await getPageInfo(locale, 'category', categoryProfile);

  return {
    title: data?.siteTitle,
    description: data?.metaDesc,
  };
}

const Page: NextPage<PageProps> = async ({ params, searchParams }) => {
  const { locale, categoryProfile } = await params;
  const page = Number((await searchParams).page) || 1;

  const { data } = await getPageInfo(locale, 'category', categoryProfile);

  return (
    <div className="w-full bg-white">
      <div className=" w-full mx-auto  md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex gap-4 mb-6">
              <Avatar
                className="my-auto flex h-10 w-10 md:h-14 md:w-14 md:m-0"
                alt={data.name}
                src={data.logo}
              />
              <div className="flex flex-1 flex-col gap-0.5 md:gap-0">
                <PageHeading>{data.name}</PageHeading>
                <p className="text-gray-500">{`${data.reviewsCount} reviews`}</p>
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
                <p className="text-grey-700 text-xs font-bold">Share</p>
              </div>
            </div>
            <LongDescription text={data.bodyText} />
          </div>
        </section>

        <ProfileGrid id={data.id} locale={locale} page={page} type={'category'} />

        <SEOSection heading="SEO text lorem ipsum" content={data.footerText} />
      </div>
    </div>
  );
};

export default Page;
