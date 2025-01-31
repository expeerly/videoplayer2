'use client';
import React, { FunctionComponent, useCallback } from 'react';
import { BagIcon, CloseIcon, MoreIcon } from '@/src/assets/icons';
import { ShareDialog } from './ShareDialog';
import { useTranslations } from 'next-intl';
import { useSharedDispatch, useSharedState } from '../../context/reducer';
import { Button } from './Button';
import Link from 'next/link';
import { VideoResponse } from '@/src/db/types';

type VideoActionsProps = {
  video: VideoResponse;
  isVideoDetails?: boolean;
};

export const VideoActions: FunctionComponent<VideoActionsProps> = ({ video, isVideoDetails }) => {
  const t = useTranslations();
  const dispatch = useSharedDispatch();
  const { videoDetailsDrawer, userHistory } = useSharedState();

  const moreButtonHandler = useCallback(() => {
    if (isVideoDetails) {
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
    } else {
      dispatch({
        type: 'VIDEO_DETAILS_DRAWER',
        payload: !videoDetailsDrawer,
      });
    }
  }, [isVideoDetails, videoDetailsDrawer, dispatch]);

  return (
    <div className="flex h-full flex-col items-center justify-between gap-6 ">
      <Button
        isOnlyIcon
        variant={'secondary'}
        size="sm"
        className="!bg-opacity-50 md:!bg-opacity-100 !bg-grey-500"
        href={userHistory[userHistory.length - 2] ?? '/'}
      >
        <CloseIcon className="[&>g>path]:!fill-white" />
      </Button>

      <div className="flex flex-col gap-6">
        <ShareDialog video={video} />

        <button
          onClick={moreButtonHandler}
          className={`flex flex-col items-center text-sm font-semibold`}
        >
          <div
            className={` w-10 h-10 rounded-full bg-grey-500 flex items-center justify-center !bg-opacity-50 md:!bg-opacity-100`}
          >
            <MoreIcon />
          </div>
          <p>{t('more')}</p>
        </button>

        <Link
          target={'_blank'}
          href={video.product.productLink}
          className={`flex flex-col items-center text-sm font-semibold`}
        >
          <div
            className={` w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center !bg-opacity-50 md:!bg-opacity-100`}
          >
            <BagIcon />
          </div>
          <p>{t('shop')}</p>
        </Link>
      </div>
    </div>
  );
};
