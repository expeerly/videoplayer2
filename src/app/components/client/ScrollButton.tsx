'use client';
import { FunctionComponent, memo, useCallback } from 'react';
import { DownArrowIcon } from '@/src/assets/icons';

type ScrollButtonProps = {
  className?: string;
};

const ScrollButtonComponent: FunctionComponent<ScrollButtonProps> = ({ className = '' }) => {
  const handleScroll = useCallback(() => {
    const currentPosition = document.documentElement.scrollTop;
    window.scrollTo({
      top: currentPosition + 500,
    });
  }, []);

  return (
    <button
      onClick={handleScroll}
      className={`bg-white rounded-full p-3 hover:bg-grey-100 transition-colors duration-200 cursor-pointer ${className}`}
      aria-label={`Scroll to reviewer story section`}
    >
      <DownArrowIcon height={14} width={14} />
    </button>
  );
};

export const ScrollButton = memo(ScrollButtonComponent);
