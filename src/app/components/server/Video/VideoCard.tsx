import { FunctionComponent } from 'react';
import { VideoActions } from '../../client/VideoActions';
import { VideoInfo } from './VideoInfo';
import { VideoPlayer } from './VideoPlayer';

export interface Video {
  id: string;
  playbackId: string;
  caption: string;
  username: string;
  userAvatar: string;
  category: string;
  brandName: string;
  productName: string;
}

interface VideoCardProps {
  video: Video;
  isVisible: boolean;
  isVideoDetails?: boolean;
}

export const VideoCard: FunctionComponent<VideoCardProps> = ({
  video,
  isVisible,
  isVideoDetails,
}) => {
  return (
    <div className=" pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100svh] w-full flex flex-col gap-3 snap-start items-center justify-center md:h-full md:p-0">
      <div className=" flex gap-4 w-full h-full items-end md:h-[90%] md:max-w-[448px]">
        <div className="relative h-full w-full flex bg-black md:aspect-[9/16] group">
          <VideoPlayer isVisible={isVisible} playbackId={video.playbackId} />
          <VideoInfo
            brand={'Dyson'}
            category={'Supersonic Professional'}
            rating={4.2}
            video={video}
            isVideoDetails={isVideoDetails}
          />
        </div>
        <div className="hidden w-0 h-full  md:flex md:w-[50px]">
          <VideoActions video={video} isVideoDetails={isVideoDetails} />
        </div>
      </div>
    </div>
  );
};
