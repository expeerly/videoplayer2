import { LongDescription } from '@/src/app/components/client/LongDescription';
import { Avatar } from '@/src/app/components/client/Avatar';
import { Metadata, NextPage } from 'next';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { Languages } from '@/src/db/types';
import { getPageInfo } from '@/src/app/actions/actions';
import { ProfileGrid } from '../../../../components/server/ProfileGrid';
import { getDictionary } from '@/src/lib/dictionary';
import { notFound } from 'next/navigation';
import { ShareDialog } from '@/src/app/components/client/ShareDialog';

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
    openGraph: {
      type: 'website',
      title: data?.siteTitle,
      description: data?.metaDesc,
      url: `${process.env.SITEBASEURL}/${locale}/video-reviews/productcategory/${categoryProfile}`,
      images: [
        {
          url: 'https://assets-global.website-files.com/63d7c29fce90dd477edff1e4/645e3c9bacfb26bc656672b0_expeerly_opengraph_image.jpg',
          width: 1200,
          height: 630,
          alt: data?.siteTitle,
        },
      ],
      siteName: 'Expeerly',
    },
  };
}

const Page: NextPage<PageProps> = async ({ params, searchParams }) => {
  const { locale, categoryProfile } = await params;
  const page = Number((await searchParams)?.page) || 1;

  const { t } = await getDictionary();
  const { data } = await getPageInfo(locale, 'category', categoryProfile);

  if (!data) {
    notFound();
  }

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
                <PageHeading>
                  {data.name} {t('videoReviews')}
                </PageHeading>
                <p className="text-gray-500">
                  {`${data.reviewsCount} ${data?.reviewsCount && data?.reviewsCount?.length > 1 ? t('reviews') : t('singleReview')}`}
                </p>
              </div>
              <div
                className={
                  'flex flex-col gap-0.5 justify-center items-center md:absolute md:m-0 md:top-10 md:right-12'
                }
              >
                <ShareDialog
                  data={{
                    title: data?.name,
                    description: t(data?.bodyText),
                  }}
                  hasEmbed={false}
                />
              </div>
            </div>
            <LongDescription text={data.bodyText} />
          </div>
        </section>

        <ProfileGrid
          id={data.id}
          locale={locale}
          page={page}
          type={'category'}
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
            type: 'brand-feed',
          }}
        />

        <SEOSection content={data.footerText} />
      </div>
    </div>
  );
};

export default Page;
