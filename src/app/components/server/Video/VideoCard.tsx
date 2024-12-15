import { FunctionComponent, ReactNode } from 'react';
import { VideoActions } from '../../client/VideoActions';
import { VideoInfo } from './VideoInfo';
import { VideoPlayer } from '../../client/VideoPlayer';

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
  isVideoDetails?: boolean;
  isFirst?: boolean;
  detailDrawer?: ReactNode;
}

export const VideoCard: FunctionComponent<VideoCardProps> = ({
  video,
  isVideoDetails,
  isFirst,
  detailDrawer,
}) => {
  return (
    <>
      <div className=" h-full flex-1 w-full flex flex-col gap-3 snap-start items-center justify-center md:h-full md:p-0 mb-2.5">
        <div className="flex gap-4 w-max mx-auto h-full items-end">
          <div className="relative h-full flex">
            <div className="w-screen h-full sm:max-w-[441px] relative">
              <VideoPlayer isFirst={isFirst} playbackId={video.playbackId} />
            </div>
            <VideoInfo
              brand={'Dyson'}
              category={'Supersonic Professional'}
              rating={4.2}
              video={video}
              isVideoDetails={isVideoDetails}
              detailDrawer={detailDrawer}
            />
          </div>
          <div className="hidden w-0 h-full sm:flex sm:w-auto">
            <VideoActions
              video={video}
              isVideoDetails={isVideoDetails}
              detailDrawer={detailDrawer}
            />
          </div>
        </div>
      </div>
    </>
  );
};
