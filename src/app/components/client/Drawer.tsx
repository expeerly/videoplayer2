'use client';
import { MoreIcon } from '@/src/assets/icons';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
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
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
}

export const Drawer: FunctionComponent<PropsWithChildren<DrawerProps>> = ({
  children,
  onOpenChange,
  className = '',
}) => {
  const t = useTranslations();
  const HEIGHTS = useRef({
    min: { class: 'h-96', px: 384 },
    max: { class: 'h-screen', px: 0 },
  });

  const [state, setState] = useState({
    isOpen: false,
    isDragging: false,
    height: HEIGHTS.current.min.class,
    startY: 0,
    startHeight: 0,
  });

  useEffect(() => {
    const updateMaxHeight = () => {
      HEIGHTS.current.max.px = window.innerHeight;
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

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
  }, [state.isOpen]);

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

      if (newHeight < HEIGHTS.current.min.px * 0.7) {
        setState(prev => ({ ...prev, isOpen: false }));
        return;
      }

      if (newHeight >= HEIGHTS.current.min.px && newHeight <= HEIGHTS.current.max.px) {
        drawerRef.current.style.height = `${newHeight}px`;
      }
    },
    [state.isDragging, state.startY, state.startHeight]
  );

  const handleDragEnd = useCallback(() => {
    if (!drawerRef.current) return;

    const currentHeight = drawerRef.current.offsetHeight;
    if (currentHeight < HEIGHTS.current.min.px * 0.8) {
      setState(prev => ({ ...prev, isOpen: false, isDragging: false }));
    } else {
      if (currentHeight < HEIGHTS.current.min.px * 1.2) {
        drawerRef.current.style.height = '';
      }
      setState(prev => ({ ...prev, isDragging: false }));
    }
  }, []);

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
    if (!state.isOpen) {
      setState(prev => ({ ...prev, height: HEIGHTS.current.min.class }));
      if (drawerRef.current) drawerRef.current.style.height = '';
    }
    onOpenChange?.(state.isOpen);
  }, [state.isOpen, onOpenChange]);

  const handleClose = () => setState(prev => ({ ...prev, isOpen: false }));

  const baseClasses = useMemo(
    () =>
      clsx(
        'w-full fixed left-0 right-0',
        state.height,
        'bg-white rounded-t-2xl shadow-lg',
        'transform transition-transform duration-300 ease-in-out z-50',
        {
          'translate-y-0': state.isOpen,
          'translate-y-full': !state.isOpen,
        },
        {
          'transition-none': state.isDragging,
        },
        className
      ),
    [state.height, state.isOpen, state.isDragging, className]
  );

  return (
    <>
      <button
        onClick={() => setState(prev => ({ ...prev, isOpen: true }))}
        className="flex flex-col items-center text-sm font-semibold"
      >
        <div className="w-10 h-10 rounded-full bg-grey-500 flex items-center justify-center !bg-opacity-50 md:!bg-opacity-100">
          <MoreIcon />
        </div>
        <p>{t('more')}</p>
      </button>
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={handleClose}
          role="presentation"
        />
      )}
      <div
        ref={drawerRef}
        className={baseClasses}
        style={{ bottom: 0 }}
        role="dialog"
        aria-modal="true"
        inert={!state.isOpen}
      >
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
