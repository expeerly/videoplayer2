'use client';
import { FunctionComponent } from 'react';
import { DownArrowIcon } from '@/src/assets/icons';

type ScrollButtonProps = {
  targetSectionId: string;
  className?: string;
};

export const ScrollButton: FunctionComponent<ScrollButtonProps> = ({
  targetSectionId,
  className = '',
}) => {
  const handleScroll = () => {
    const element = document.getElementById(targetSectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

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
