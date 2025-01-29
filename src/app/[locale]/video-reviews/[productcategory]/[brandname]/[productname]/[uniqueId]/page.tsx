import { getRelatedVideos, getVideo } from '@/src/app/actions/actions';
import { ScrollToSection } from '@/src/app/components/client/ScrollToSection';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { ReviewGrid } from '@/src/app/components/server/ReviewGrid';
import { Divider } from '@/src/app/components/server/Video/Divider';
import { VideoCard } from '@/src/app/components/server/Video/VideoCard';
import { VideoDetails } from '@/src/app/components/client/VideoDetails';
import { Languages } from '@/src/db/types';
import { getDictionary } from '@/src/lib/dictionary';
import { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{
    locale: Languages;
    uniqueId: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, uniqueId } = await params;
  const { data } = await getVideo({ videoId: uniqueId, lang: locale });

  return {
    title: data?.siteTitle,
    description: data?.metaDescription,
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { t } = await getDictionary();
  const { locale, uniqueId } = await params;

  const [{ data: video }, { data: videoDetails }, { data: relatedVideos }] = await Promise.all([
    getVideo({ videoId: uniqueId, lang: locale }),
    getVideo({ videoId: uniqueId, lang: locale, metaInfo: true }),
    getRelatedVideos({ lang: locale, videoId: uniqueId }),
  ]);

  if (!video || !videoDetails) {
    notFound();
  }

  return (
    <div className="w-full items-center flex flex-col md:w-max md:mx-auto overflow-auto h-full z-50">
      <div className="flex w-full h-[90vh] md:h-[calc(100vh-150px)] pt-6">
        <VideoCard key={video.id} video={video} isVideoDetails isFirst />
      </div>
      <div className="w-full px-5 flex flex-col md:max-w-[497px] mx-auto pt-7 md:pt-2 md:px-0 relative">
        <div id="details" className="absolute  top-0  md:-top-20" />
        <ScrollToSection hasFAQ={videoDetails.faqs.length > 0}>
          <PageHeading>{video.videoTitle}</PageHeading>
        </ScrollToSection>
        <div className="pt-7">
          <VideoDetails data={videoDetails} />
        </div>
        <Divider className="my-5 md:my-6" />
      </div>

      {relatedVideos.videos?.length > 1 && (
        <div className="flex w-full justify-center flex-col gap-6 mb-16 md:mx-auto md:w-max">
          <h1 className="px-5 text-left font-extrabold text-2xl text-grey-700 w-full md:text-center">
            {t('moreVideosOn')} {video.product.productName}
          </h1>
          <div className="w-full md:max-w-[531px]">
            <ReviewGrid
              classNames={{
                gridClassName: '!gap-[15px] md:justify-center',
              }}
              header={{
                variant: 'secondary',
              }}
              data={relatedVideos}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
