import React, { FunctionComponent, ReactNode } from 'react';
import { VideoActions } from '../../client/VideoActions';
import { Video } from './VideoCard';
import { Button } from '../../client/Button';
import { StarRating } from '../StarRating';
import { Avatar } from '../Avatar';
import { Link } from '@/src/i18n/routing';
import { BlueTick } from '@/src/assets/icons';

type VideoInfoProps = {
  brand: string;
  category: string;
  rating: number;
  video: Video;
  isVideoDetails?: boolean;
  detailDrawer?: ReactNode;
};

export const VideoInfo: FunctionComponent<VideoInfoProps> = ({
  brand,
  category,
  rating,
  video,
  isVideoDetails,
  detailDrawer,
}) => {
  return (
    <>
      <Link
        href={'/explore/reviewers/1234'}
        className="flex items-center absolute top-5 left-5 text-white gap-1"
      >
        <Avatar size="sm" />
        <span>Carmo L.</span>
        <BlueTick />
      </Link>

      <div className=" absolute right-5 top-3.5 h-3/4 text-white  flex sm:hidden ">
        <VideoActions video={video} isVideoDetails={isVideoDetails} detailDrawer={detailDrawer} />
      </div>

      <div className="absolute bottom-14  px-5 justify-between flex items-center w-full text-white">
        <div className="flex gap-2 items-center flex-1">
          <Avatar />
          <div className="flex flex-col flex-1">
            <Link href={`/explore/brand/${brand}`}>
              <h2 className="text-sm font-bold">@{brand}</h2>
            </Link>
            <Link href={`/explore/productcategory/${category}`}>
              <p className="text-sm font-bold">{category}</p>
            </Link>
            <div className="flex gap-2 items-center -mt-0.5">
              <span>{rating}</span>
              <StarRating size="sm" rating={rating} showRating={false} />
            </div>
          </div>
        </div>
        <Button className="!text-sm">Buy Now</Button>
      </div>
    </>
  );
};
