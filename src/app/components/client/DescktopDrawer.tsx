import React, { FunctionComponent, PropsWithChildren } from 'react';
import { CloseIcon } from '@/src/assets/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const DesktopDrawer: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`shadow fixed top-[81px] right-0 h-full z-50 bg-black/25 max-h-[calc(100vh-85px)] overflow-auto mid-lg:static mid-lg:w-max mid-lg:bg-transparent  ${isOpen ? 'w-full' : 'w-0'}`}
    >
      <div
        className={`
          ml-auto
          h-full 
          z-30 
          bg-white 
          shadow-lg 
          transition-all
          duration-300
          ease-in-out 
          max-h-[calc(100vh-85px)] 
          overflow-auto
          ${isOpen ? 'w-96 translate-x-0' : 'w-0 translate-x-full'}
        `}
      >
        <div
          className={`
          transition-opacity
          duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0'}
          ${isOpen ? 'delay-150' : 'delay-0'}
        `}
        >
          <div className="p-4 pb-0 flex justify-end">
            <button
              onClick={onClose}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="px-6 pb-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
