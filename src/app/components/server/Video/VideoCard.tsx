import { FunctionComponent, ReactNode } from 'react';
import { VideoActions } from '../../client/VideoActions';
import { VideoInfo } from './VideoInfo';
import { VideoPlayer } from '../../client/VideoPlayer';
import { VideoResponse } from '@/src/db/types';

type VideoCardProps = {
  video: VideoResponse;
  isVideoDetails?: boolean;
  isFirst?: boolean;
  detailDrawer?: ReactNode;
  videoId?: string;
};

export const VideoCard: FunctionComponent<VideoCardProps> = ({
  video,
  isVideoDetails,
  videoId,
}) => {
  return (
    <>
      <div className=" h-full flex-1 w-full flex flex-col gap-3 snap-start items-center justify-center md:h-full md:p-0 mb-2.5">
        <div className="flex gap-4 w-max mx-auto h-full items-end">
          <div className="relative h-full flex">
            <div className="w-screen h-full sm:max-w-[441px] relative">
              <VideoPlayer
                id={videoId}
                playbackId={video.playbackId}
                isVideoDetails={isVideoDetails}
              />
            </div>
            <VideoInfo video={video} isVideoDetails={isVideoDetails} />
          </div>
          <div className="hidden w-0 h-full sm:flex sm:w-auto">
            <VideoActions video={video} isVideoDetails={isVideoDetails} />
          </div>
        </div>
      </div>
    </>
  );
};
