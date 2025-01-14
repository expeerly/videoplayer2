import { ScrollToSection } from '@/src/app/components/client/ScrollToSection';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { ReviewGrid } from '@/src/app/components/server/ReviewGrid';
import { Divider } from '@/src/app/components/server/Video/Divider';
import { VideoCard } from '@/src/app/components/server/Video/VideoCard';
import { VideoDetails } from '@/src/app/components/server/Video/VideoDetails';
import { getDictionary } from '@/src/lib/dictionary';
import { NextPage } from 'next';

const videoData = {
  id: '1',
  playbackId: 'qs2vN7D3ArOWe7i2sEVgHhlNcaZKayH3mf01i1ujAjKk',
  caption: '🚴‍♂️ Epic mountain biking trails! #mtb #adventure',
  username: 'adventu',
  likes: 15420,
  comments: 234,
  shares: 89,
  userAvatar: '/avatars/user1.jpg',
  category: 'Adventure',
  brandName: 'Dyson',
  productName: 'Supersonic',
  rating: 2.3,
};

const Page: NextPage = async () => {
  const { t } = await getDictionary();

  return (
    <div className="w-full items-center flex flex-col md:w-max md:mx-auto overflow-auto h-full z-50">
      <div className="flex w-full h-[90vh] md:h-[calc(100vh-150px)] pt-6">
        <VideoCard key={videoData.id} video={videoData} isVideoDetails isFirst />
      </div>
      <div className="w-full px-5 flex flex-col md:max-w-[497px] mx-auto pt-7 md:pt-2 md:px-0 relative">
        <div id="details" className="absolute  top-0  md:-top-20" />
        <ScrollToSection>
          <PageHeading>
            Discover Mary’s Dyson Airwrap Multi-Styler Review: Effortless Hair Styling Made
            Stunningly Simple!
          </PageHeading>
        </ScrollToSection>
        <div className="pt-7">
          <VideoDetails />
        </div>
        <Divider className="my-5 md:my-6" />
      </div>

      <div className="flex w-full justify-center flex-col gap-6 mb-16 md:mx-auto md:w-max">
        <h1 className="px-5 text-left font-extrabold text-2xl text-grey-700 w-full md:text-center">
          {t('moreVideosOn')} the Airwrap Styler
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
