import { getVideoDetils } from '@/src/app/actions/actions';
import { ScrollToSection } from '@/src/app/components/client/ScrollToSection';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { ReviewGrid } from '@/src/app/components/server/ReviewGrid';
import { Divider } from '@/src/app/components/server/Video/Divider';
import { VideoCard } from '@/src/app/components/server/Video/VideoCard';
import { VideoDetails } from '@/src/app/components/server/Video/VideoDetails';
import { Languages } from '@/src/db/types';
import { getDictionary } from '@/src/lib/dictionary';
import { NextPage } from 'next';

type PageProps = {
  params: Promise<{
    locale: Languages;
    uniqueId: string;
  }>;
};

const Page: NextPage<PageProps> = async ({ params }) => {
  const { t } = await getDictionary();

  const { locale, uniqueId } = await params;

  const { data } = await getVideoDetils({ videoId: uniqueId, lang: locale });

  console.log({ data });

  return (
    <div className="w-full items-center flex flex-col md:w-max md:mx-auto overflow-auto h-full z-50">
      <div className="flex w-full h-[90vh] md:h-[calc(100vh-150px)] pt-6">
        <VideoCard key={data.id} video={data} isVideoDetails isFirst />
      </div>
      <div className="w-full px-5 flex flex-col md:max-w-[497px] mx-auto pt-7 md:pt-2 md:px-0 relative">
        <div id="details" className="absolute  top-0  md:-top-20" />
        <ScrollToSection>
          <PageHeading>{data.videoTitle}</PageHeading>
        </ScrollToSection>
        <div className="pt-7">
          <VideoDetails data={data} />
        </div>
        <Divider className="my-5 md:my-6" />
      </div>

      <div className="flex w-full justify-center flex-col gap-6 mb-16 md:mx-auto md:w-max">
        <h1 className="px-5 text-left font-extrabold text-2xl text-grey-700 w-full md:text-center">
          {t('moreVideosOn')} {data.product.productName}
        </h1>
        <div className="w-full md:max-w-[531px]">
          <ReviewGrid
            classNames={{
              gridClassName: '!gap-[15px] md:justify-center',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
