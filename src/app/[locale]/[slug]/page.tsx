import { NextPage } from 'next';
import { VideoFeed } from '../../components/client/VideoFeed';

const Page: NextPage = () => {
  return (
    <div className="h-max">
      <VideoFeed videos={[]} />
    </div>
  );
};

export default Page;
