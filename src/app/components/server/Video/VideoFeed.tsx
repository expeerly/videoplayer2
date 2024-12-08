import { Video, VideoCard } from './VideoCard';

type Props = {
  videos: Video[];
};

export const VideoFeed = ({ videos }: Props) => {
  return (
    <div className="fixed z-[99999] inset-0 h-full w-full md:absolute md:h-[calc(100vh-85px)] overflow-hidden">
      <div
        className="h-[90vh] w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none md:h-full"
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
