'use client';
import { FunctionComponent, memo, useCallback } from 'react';
import { DownArrowIcon } from '@/src/assets/icons';

type ScrollButtonProps = {
  targetSectionId: string;
  className?: string;
};

const ScrollButtonComponent: FunctionComponent<ScrollButtonProps> = ({
  targetSectionId,
  className = '',
}) => {
  const handleScroll = useCallback(() => {
    const element = document.getElementById(targetSectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [targetSectionId]);

  return (
    <button
      onClick={handleScroll}
      className={`bg-white rounded-full p-3 hover:bg-gray-100 transition-colors duration-200 cursor-pointer ${className}`}
      aria-label={`Scroll to ${targetSectionId} section`}
    >
      <DownArrowIcon height={14} width={14} />
    </button>
  );
};

export const ScrollButton = memo(ScrollButtonComponent);
