'use client';
import { ShareIcon } from '@/src/assets/icons';
import React, { FunctionComponent, useCallback } from 'react';
import { Button } from './Button';

type Props = {
  title: string;
  text: string;
};

export const ShareButton: FunctionComponent<Props> = ({ title, text }) => {
  const handleShare = useCallback(async () => {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }, [title, text]);

  return (
    <Button
      onClick={handleShare}
      isOnlyIcon
      variant="secondary"
      type="button"
      aria-haspopup="true"
      title="Show/Hide Menu"
      id="menu-button"
      className=" !p-0.5 z-30 max-h-10 max-w-10 ml-auto md:h-12 md:w-12 flex justify-center items-center"
    >
      <ShareIcon />
    </Button>
  );
};
