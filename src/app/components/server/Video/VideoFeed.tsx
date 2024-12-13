import { Video, VideoCard } from './VideoCard';
import { VideoDetails } from './VideoDetails';

type Props = {
  videos: Video[];
};

export const VideoFeed = ({ videos }: Props) => {
  return (
    <div className="bg-white fixed z-[99999] flex justify-center sm:items-center h-full w-full overflow-hidden md:h-[calc(100vh-85px)] md:max-w-[calc(100%-25%)] mid-lg:max-w-[calc(100%-275px)] md:right-0 md:bottom-0">
      <div
        className="h-[90.5vh] w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none sm:h-full"
        style={{
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {videos.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            isFirst={i === 0}
            detailDrawer={<VideoDetails isExplore></VideoDetails>}
          />
        ))}
      </div>
    </div>
  );
};
