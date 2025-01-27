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
        href={`/explore/reviewers/${video?.creator?.slug}`}
        className="flex items-center absolute top-5 left-5 text-white gap-1"
      >
        <Avatar
          size="sm"
          src={video.creator?.logo}
          alt={video.creator?.name}
          className="[&>img]:object-cover"
        />
        <span>
          {video.creator?.name
            .split(' ')
            .map((part, index, arr) =>
              index === arr.length - 1 ? part.charAt(0) + '.' : part + ' '
            )
            .join('')}
        </span>
        <BlueTick />
      </Link>

      <div className=" absolute right-5 top-3.5 h-3/4 text-white  flex sm:hidden ">
        <VideoActions video={video} isVideoDetails={isVideoDetails} />
      </div>

      <div className="absolute bottom-14  px-5 justify-between flex items-center w-full text-white">
        <div className="flex gap-2 items-center flex-1">
          <Link href={`/explore/brand/${video?.brand?.brandSlug}`}>
            <Avatar src={video?.brand?.logo} alt={video?.brand?.name} />
          </Link>
          <div className="flex flex-col flex-1">
            <Link href={`/explore/productcategory/${video?.category?.slug}`}>
              <span className="text-sm">{video?.category?.name}</span>
            </Link>
            <div className="flex gap-2 items-center -mt-0.5">
              <span>{video?.starRating}</span>
              <StarRating size="sm" rating={video?.starRating} showRating={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
