import React, { FunctionComponent } from 'react';
import { VideoActions } from '../../client/VideoActions';
import { Video } from './VideoCard';
import { StarRating } from '../StarRating';
import { Avatar } from '../Avatar';
import { Link } from '@/src/i18n/routing';
import { BlueTick } from '@/src/assets/icons';

type VideoInfoProps = {
  video: Video;
  isVideoDetails?: boolean;
};

export const VideoInfo: FunctionComponent<VideoInfoProps> = ({ video, isVideoDetails }) => {
  return (
    <>
      <Link
        href={'/explore/reviewers/1234'}
        className="flex items-center absolute top-5 left-5 text-white gap-1"
      >
        <Avatar size="sm" />
        <span>{video.username}</span>
        <BlueTick />
      </Link>

      <div className=" absolute right-5 top-3.5 h-3/4 text-white  flex sm:hidden ">
        <VideoActions video={video} isVideoDetails={isVideoDetails} />
      </div>

      <div className="absolute bottom-14  px-5 justify-between flex items-center w-full text-white">
        <div className="flex gap-2 items-center flex-1">
          <Link href={`/explore/brand/${video.brandName}`}>
            <Avatar />
          </Link>
          <div className="flex flex-col flex-1">
            <Link href={`/explore/productcategory/${video.category}`}>
              <p className="text-sm font-bold">{video.category}</p>
            </Link>
            <div className="flex gap-2 items-center -mt-0.5">
              <span>{video.rating}</span>
              <StarRating size="sm" rating={video.rating} showRating={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
