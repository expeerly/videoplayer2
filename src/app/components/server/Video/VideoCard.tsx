import { FunctionComponent } from 'react';
import { VideoActions } from '../../client/VideoActions';
import { VideoInfo } from './VideoInfo';
import { VideoPlayer } from './VideoPlayer';
import { VideoTags } from './VideoTags';

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
}

export const VideoCard: FunctionComponent<VideoCardProps> = ({ video, isVisible }) => {
  return (
    <div className=" pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-[100svh] w-full flex flex-col gap-3 snap-start items-center justify-center md:h-full md:p-0">
      <div className="hidden md:flex mx-auto">
        <VideoTags />
      </div>

      <div className=" md:max-w-[448px] flex gap-4 w-full h-full md:h-[90%] items-end">
        <div className="relative h-full w-full flex bg-black">
          <VideoPlayer isVisible={isVisible} playbackId={video.playbackId} />
          <VideoInfo
            brand={'Dyson'}
            category={'Supersonic Professional'}
            rating={4.2}
            video={video}
          />
        </div>
        <div className="hidden w-0 h-full  md:flex md:w-[50px]">
          <VideoActions video={video} />
        </div>
      </div>
    </div>
  );
};
