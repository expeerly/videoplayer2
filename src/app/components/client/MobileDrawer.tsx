'use client';
import clsx from 'clsx';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
} from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
}

export const MobileDrawer: FunctionComponent<PropsWithChildren<DrawerProps>> = ({
  children,
  isOpen,
  onClose,
  onOpenChange,
  className = '',
}) => {
  const [state, setState] = useState({
    isDragging: false,
    startY: 0,
    startHeight: 0,
  });

  const drawerRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preventPullToRefresh = (e: TouchEvent) => {
      if (dragHandleRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.body.addEventListener('touchmove', preventPullToRefresh, { passive: false });
    return () => {
      document.body.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, [isOpen]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragHandleRef.current?.contains(e.target as Node)) return;

    e.preventDefault();
    e.stopPropagation();

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setState(prev => ({
      ...prev,
      isDragging: true,
      startY: clientY,
      startHeight: drawerRef.current?.offsetHeight || 0,
    }));
  }, []);

  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!state.isDragging || !drawerRef.current) return;

      if ('touches' in e) {
        e.preventDefault();
      }

      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const delta = state.startY - clientY;
      const newHeight = state.startHeight + delta;
      const viewportHeight = window.innerHeight;
      const minHeight = viewportHeight * 0.8;

      if (newHeight < minHeight) {
        onClose();
        return;
      }

      drawerRef.current.style.height = `${newHeight}px`;
    },
    [state.isDragging, state.startY, state.startHeight, onClose]
  );

  const handleDragEnd = useCallback(() => {
    if (!drawerRef.current) return;

    const currentHeight = drawerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const minHeight = viewportHeight * 0.5;

    if (currentHeight < minHeight) {
      onClose();
    } else {
      drawerRef.current.style.height = '';
      setState(prev => ({ ...prev, isDragging: false }));
    }
  }, [onClose]);

  useEffect(() => {
    if (state.isDragging) {
      const options = { passive: false };
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleDrag, options);
      window.addEventListener('touchend', handleDragEnd);

      return () => {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', handleDragEnd);
        window.removeEventListener('touchmove', handleDrag);
        window.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [state.isDragging, handleDrag, handleDragEnd]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const baseClasses = useMemo(
    () =>
      clsx(
        'fixed bg-white shadow-lg z-50 w-full h-full max-h-[calc(100vh-150px)]',
        'transform transition-transform duration-300 ease-in-out',
        'w-full rounded-t-2xl bottom-0 left-0 right-0',
        {
          'translate-y-full': !isOpen,
          'translate-y-0': isOpen,
        },
        {
          'transition-none': state.isDragging,
        },
        className
      ),
    [isOpen, state.isDragging, className]
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
          role="presentation"
        />
      )}
      <div ref={drawerRef} className={baseClasses} role="dialog" aria-modal="true" inert={!isOpen}>
        <div
          ref={dragHandleRef}
          className="w-full flex justify-center p-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          role="button"
          tabIndex={0}
          aria-label="Drag to resize drawer"
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        <div className="px-4 pb-4 h-full overflow-y-auto">{children}</div>
      </div>
    </>
  );
};
