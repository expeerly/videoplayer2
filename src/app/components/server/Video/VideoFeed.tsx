import { Video, VideoCard } from './VideoCard';

type Props = {
  videos: Video[];
};

export const VideoFeed = ({ videos }: Props) => {
  return (
    <div className="fixed z-[99999] my-auto h-full w-full overflow-hidden md:h-[calc(100vh-85px)] md:w-[75%] md:right-0 md:bottom-0">
      <div
        className="h-[92vh] w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none md:h-full"
        style={{
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {videos.map((video, i) => (
          <VideoCard key={video.id} video={video} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );
};
