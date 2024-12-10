'use client';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { MoreIcon, ShareIcon } from '@/src/assets/icons';
import { Video } from '../server/Video/VideoCard';
import Link from 'next/link';
import { BackButton } from './BackButton';
import { ShareDialog } from './ShareDialog';
import isMobile from 'is-mobile';

type VideoActionsProps = {
  video: Video;
  isVideoDetails?: boolean;
};

export const VideoActions: FunctionComponent<VideoActionsProps> = ({ video, isVideoDetails }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const scrollToElement = useCallback(() => {
    try {
      const element = document.getElementById('details');

      if (element) {
        element.scrollIntoView({
          block: 'start',
        });
      }
    } catch (error) {
      console.error('Error scrolling to element:', error);
    }
  }, []);

  const handleShare = useCallback(async () => {
    if (isMobile() && navigator.share) {
      try {
        await navigator.share({
          title: video.productName,
          text: `Check out this video review of ${video.productName} by ${video.brandName}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setIsOpen(true);
    }
  }, [video]);

  return (
    <div className="flex h-full flex-col items-center justify-between gap-6 ">
      <BackButton variant="secondary" className={`!bg-grey-500 bg-opacity-50 md:bg-opacity-100`} />

      <div className="flex flex-col gap-6">
        <button className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 bg-grey-500 rounded-full flex items-center justify-center text-white">
            <ShareIcon onClick={handleShare} />
          </div>
        </button>

        {!isVideoDetails ? (
          <Link
            className="flex flex-col items-center"
            href={`/video-reviews/${video.category}/${video.brandName}/${video.productName}/${video.playbackId}`}
          >
            <div className="w-10 h-10 text-sm font-semibold rounded-full bg-grey-500 flex items-center justify-center">
              <MoreIcon />
            </div>
            More
          </Link>
        ) : (
          <button onClick={scrollToElement}>
            <div className="w-10 h-10 text-sm font-semibold rounded-full bg-grey-500 flex items-center justify-center">
              <MoreIcon />
            </div>
            More
          </button>
        )}
      </div>

      <ShareDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
