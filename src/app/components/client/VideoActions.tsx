'use client';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { BagIcon, CloseIcon, MoreIcon, ShareIcon } from '@/src/assets/icons';
import { Video } from '../server/Video/VideoCard';
import { ShareDialog } from './ShareDialog';
import isMobile from 'is-mobile';
import { useTranslations } from 'next-intl';
import { useSharedDispatch, useSharedState } from '../../context/reducer';
import { Button } from './Button';

type VideoActionsProps = {
  video: Video;
  isVideoDetails?: boolean;
};

export const VideoActions: FunctionComponent<VideoActionsProps> = ({ video, isVideoDetails }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations();
  const dispatch = useSharedDispatch();
  const { videoDetailsDrawer } = useSharedState();

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

  const handleShare = useCallback(async () => {
    if (isMobile() && navigator.share) {
      try {
        await navigator.share({
          title: video.productName,
          text: t('dynamic_texts.share_action.aria_label', {
            productName: video.productName,
            brandName: video.brandName,
          }),
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setIsOpen(true);
    }
  }, [t, video.brandName, video.productName]);

  return (
    <div className="flex h-full flex-col items-center justify-between gap-6 ">
      <Button
        isOnlyIcon
        variant={'secondary'}
        size="sm"
        className="!bg-opacity-50 md:!bg-opacity-100 !bg-grey-500"
        href="/"
      >
        <CloseIcon className="[&>g>path]:!fill-white" />
      </Button>

      <div className="flex flex-col gap-6">
        <button className="flex flex-col items-center gap-1 text-sm font-semibold">
          <div
            className={`w-10 h-10 bg-grey-500 rounded-full flex items-center justify-center text-white !bg-opacity-50 md:!bg-opacity-100`}
          >
            <ShareIcon onClick={handleShare} />
          </div>
          {t('dynamic_texts.share.label')}
        </button>

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

        <button onClick={() => {}} className={`flex flex-col items-center text-sm font-semibold`}>
          <div
            className={` w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center !bg-opacity-50 md:!bg-opacity-100`}
          >
            <BagIcon />
          </div>
          <p>{'Shop'}</p>
        </button>
      </div>

      <ShareDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
