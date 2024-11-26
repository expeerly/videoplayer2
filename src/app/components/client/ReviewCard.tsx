'use client';
import React, { FunctionComponent } from 'react';
import { VideoThumbnail } from '../server/VideoThumbnail';
import { StarRating } from '../server/StarRating';
import { PlayIcon } from '@/src/assets/icons/PlayIcon';
import { Avatar } from '../server/Avatar';
import clsx from 'clsx';

type Props = {
  review: {
    id: number;
    rating: number;
    view: number;
    brand: string;
    productName: string;
  };
  className?: string;
};

export const ReviewCard: FunctionComponent<Props> = ({ review, className }) => {
  return (
    <div
      key={review.id}
      className={clsx(
        'relative rounded-[10px] overflow-hidden box-border',
        {
          'min-w-[160px] w-[160px]': true,
          'mobileS:w-[50%-50px] mobileS:min-w-[50%-50px]': true,
          'mobileM:min-w-[167] mobileM:w-[calc(50%-20px)]': true,
          'mobileL:w-[calc(45%-20px)] mobileL:min-w-[calc(45%-20px)]': true,
          'mid-tablet:w-[calc(35%-25x)] mid-tablet:min-w-[calc(35%-25px)]': true,
          'sm:w-[calc(30%-20px)] sm:min-w-[calc(30%-20px)]': true,
          'md:w-[167px] md:max-w-[167px] md:min-w-[167px]': true,
        },
        className
      )}
    >
      <div className={`h-[273px] relative group cursor-pointer w-full`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <VideoThumbnail playbackID="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe" />
        <div className="absolute top-3 left-3   text-white  rounded-full font-medium text-xs">
          <div className="flex items-center gap-1 justify-center ml-1 text-sm">
            {review.rating}
            <StarRating rating={review?.rating} size="sm" showRating={false} />
          </div>
          <div className="flex items-center mt-1 text-sm font-bold gap-1">
            <PlayIcon />
            {review.view}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 w-full">
          <div className="flex items-center gap-2 w-full">
            <div className="bg-white p-1 rounded-full">
              <Avatar size="sm" />
            </div>
            <div className="text-white w-20">
              <p className="text-sm font-medium leading-tight">{review.brand}</p>
              <p className="text-sm font-medium opacity-90 w-full truncate">{review.productName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
