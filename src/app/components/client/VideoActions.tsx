'use client';
import React, { FunctionComponent, useState } from 'react';
import { MoreIcon, ShareIcon } from '@/src/assets/icons';
import { Video } from '../server/Video/VideoCard';
import Link from 'next/link';
import { BackButton } from './BackButton';
import { ShareDialog } from './ShareDialog';

type VideoActionsProps = {
  video: Video;
  isVideo?: boolean;
};

export const VideoActions: FunctionComponent<VideoActionsProps> = ({ video, isVideo }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex h-full flex-col items-center justify-between gap-6 ">
      <BackButton variant="secondary" className={isVideo ? '!bg-black' : '!bg-grey-500'} />

      <div className="flex flex-col gap-6">
        <button className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 bg-grey-500 rounded-full flex items-center justify-center text-white">
            <ShareIcon onClick={() => setIsOpen(true)} />
          </div>
          <span className="text-sm">Share</span>
        </button>

        <Link
          className="flex flex-col items-center"
          href={`/video-reviews/${video.category}/${video.brandName}/${video.productName}/${video.playbackId}`}
        >
          <div className="w-[50px] h-[50px] text-sm font-semibold rounded-full bg-grey-500 flex items-center justify-center">
            <MoreIcon />
          </div>
          More
        </Link>
      </div>

      <ShareDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
