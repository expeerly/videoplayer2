import { LongDescription } from '@/src/app/components/client/LongDescription';
import { Avatar } from '@/src/app/components/server/Avatar';
import { StarRating } from '@/src/app/components/server/StarRating';
import { NextPage } from 'next';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { Languages } from '@/src/db/types';
import { getPageInfo } from '@/src/app/actions/actions';
import { Metadata } from 'next';
import { ProfileGrid } from '@/src/app/components/server/ProfileGrid';
import { getDictionary } from '@/src/lib/dictionary';
import { ShareButton } from '@/src/app/components/client/ShareButton';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{
    locale: Languages;
    slug: string;
    brandProfile: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, brandProfile } = await params;
  const { data } = await getPageInfo(locale, 'brand', brandProfile);

  return {
    title: data?.siteTitle,
    description: data?.metaDesc,
  };
}

const Page: NextPage<PageProps> = async ({ params, searchParams }) => {
  const { locale, brandProfile } = await params;
  const page = Number((await searchParams).page) || 1;

  const { t } = await getDictionary();
  const { data } = await getPageInfo(locale, 'brand', brandProfile);

  if (!data) {
    notFound();
  }

  return (
    <div className="w-full bg-white">
      <div className=" w-full mx-auto md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex gap-4 mb-6">
              <Link href={data?.websiteURL} target="_blank">
                <Avatar
                  className="flex h-10 w-10 min-w-10 md:h-14 md:w-14 md:min-w-14 my-auto md:m-0"
                  alt={data?.name}
                  src={data?.logo}
                />
              </Link>
              <div className="flex flex-1 flex-col ">
                <PageHeading>
                  {data?.name} {t('videoReviews')}
                </PageHeading>
                <div className="flex gap-1">
                  <StarRating rating={data?.rating} />
                  <p className="text-grey-500">{`(${data?.reviewsCount})`}</p>
                </div>
              </div>
              <div
                className={
                  'flex flex-col gap-0.5 justify-center items-center md:absolute md:m-0 md:top-10 md:right-8 mid-lg:right-12'
                }
              >
                <ShareButton title={data?.name} text={''} />
                <p className="text-grey-700 text-xs font-bold">Share</p>
              </div>
            </div>
            <LongDescription text={data?.bodyText} />
          </div>
        </section>

        <ProfileGrid
          id={data?.id}
          locale={locale}
          page={page}
          type={'brand'}
          ctaBlock={{
            heading: t('cta_block_all_brands_categories.title'),
            desc: t('cta_block_all_brands_categories.desc'),
            button: {
              label: t('learn_more.label'),
              ariaLabel: t('learn_more.aria_label'),
              href: 'https://www.get.expeerly.com/for-brands',
            },
          }}
          header={{
            variant: 'secondary',
            type: 'product-feed',
          }}
        />

        <SEOSection content={data?.footerText} />
      </div>
    </div>
  );
};

export default Page;
