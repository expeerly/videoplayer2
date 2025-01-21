import React, { FunctionComponent } from 'react';
import { VideoThumbnail } from './VideoThumbnail';
import { StarRating } from './StarRating';
import { Avatar } from './Avatar';
import clsx from 'clsx';
import { GridVideo } from '@/src/db/types';
import Link from 'next/link';

type Props = {
  review: GridVideo;
  className?: string;
};

export const ReviewCard: FunctionComponent<Props> = ({ review, className }) => {
  return (
    <div
      key={review.id}
      className={clsx(
        'relative rounded-[10px] overflow-hidden box-border',
        'min-w-[160px] w-[160px]',
        'mobileS:w-[50%-50px] mobileS:min-w-[50%-50px]',
        'mobileM:min-w-[167px] mobileM:w-[calc(50%-20px)]',
        'mobileL:w-[calc(45%-20px)] mobileL:min-w-[calc(45%-20px)]',
        'mid-tablet:w-[calc(35%-25x)] mid-tablet:min-w-[calc(35%-25px)]',
        'sm:w-[calc(30%-20px)] sm:min-w-[calc(30%-20px)]',
        'md:w-[167px] md:max-w-[167px] md:min-w-[167px]',
        className
      )}
    >
      <Link
        href={`/video-reviews/${review.categorySlug}/${review.brandSlug}/${review.productSlug}/${review.playbackId}`}
      >
        <div className={`h-[273px] relative group cursor-pointer w-full`}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
          <VideoThumbnail playbackID={review.playbackId} />
          <div className="absolute top-3 left-3   text-white  rounded-full font-medium text-xs">
            <div className="flex items-center gap-1 justify-center ml-1 text-sm">
              {review.rating}
              <StarRating rating={review?.rating} size="sm" showRating={false} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 w-full">
            <div className="flex items-center gap-2 w-full">
              <div className="bg-white p-1 rounded-full">
                <Avatar size="sm" src={review.brandLogo} alt={review.brandName} />
              </div>
              <div className="text-white w-20">
                <p className="text-sm font-medium leading-tight w-full truncate">
                  {review.brandName}
                </p>
                <p className="text-sm font-medium opacity-90 w-full truncate">
                  {review.productName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
