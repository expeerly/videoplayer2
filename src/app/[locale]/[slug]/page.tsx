import { NextPage } from 'next';
import { VideoFeed } from '../../components/client/VideoFeed';
import { sampleVideos } from '../explore/layout';

const Page: NextPage = () => {
  return (
    <div className="h-max">
      <VideoFeed videos={sampleVideos} />
    </div>
  );
};

export default Page;
