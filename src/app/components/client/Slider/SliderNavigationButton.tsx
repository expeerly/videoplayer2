import { FunctionComponent } from 'react';
import { LeftChevronIcon, RightChevronIcon } from '@/src/assets/icons';

type SliderNavigationButtonProps = {
  direction: 'left' | 'right';
  showLeftArrow?: boolean;
  showRightArrow?: boolean;
  handleScroll: (direction: 'left' | 'right') => void;
  classNameStyle?: {
    leftButtonClassName?: string;
    rightButtonClassName?: string;
  };
};

// Constants
const BUTTON_STYLES = {
  container: 'flex items-center px-2 absolute w-28 h-full top-1/2 -translate-y-1/2 z-[5]',
  button:
    'bg-white rounded-full shadow-md py-3 px-4 hover:bg-gray-50 focus:outline-none focus:ring-0',
};

export const SliderNavigationButton: FunctionComponent<SliderNavigationButtonProps> = ({
  direction,
  showLeftArrow,
  showRightArrow,
  handleScroll,
  classNameStyle,
}) => {
  const show = direction === 'left' ? showLeftArrow : showRightArrow;
  if (!show) return null;

  const buttonClassName =
    direction === 'left'
      ? classNameStyle?.leftButtonClassName
      : classNameStyle?.rightButtonClassName;

  const gradientClass =
    direction === 'left' ? 'bg-gradient-to-r from-white' : 'bg-gradient-to-l from-white';
  const positionClass = direction === 'left' ? 'left-0 justify-start' : 'right-0 justify-end';

  return (
    <div
      className={`${BUTTON_STYLES.container} ${gradientClass} ${positionClass} ${buttonClassName || ''}`}
    >
      <button
        onClick={() => handleScroll(direction === 'left' ? 'right' : 'left')}
        className={BUTTON_STYLES.button}
        aria-label={direction === 'left' ? 'Previous' : 'Next'}
      >
        {direction === 'left' ? <LeftChevronIcon /> : <RightChevronIcon />}
      </button>
    </div>
  );
};
