import { FunctionComponent, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import {
  AnimatePresence,
  motion,
  animate,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  PanInfo,
  useDragControls,
} from 'framer-motion';

const SHEET_MARGIN = 56;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileDrawer: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  isOpen,
  onClose,
}) => {
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const h = window.innerHeight - SHEET_MARGIN;
  const y = useMotionValue(h);
  const bgOpacity = useTransform(y, [0, h], [0.4, 0]);
  const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
      if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
        onClose();
      } else {
        animate(y, 0, {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          min: 0,
          max: h,
        });
      }
    },
    [onClose, y, h]
  );

  const handleDragStart = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.overflow = 'hidden';
    }
  }, []);

  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, { offset }: PanInfo) => {
      if (offset.y < 0) {
        y.set(0);
      }
    },
    [y]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleDragTransitionEnd = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.overflow = 'auto';
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 overscroll-none touch-none"
          style={{ backgroundColor: bg }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="bg-white absolute w-full rounded-t-xl shadow-lg flex flex-col"
            initial={{ y: h }}
            animate={{ y: 0 }}
            exit={{ y: h }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            style={{
              y,
              top: SHEET_MARGIN,
              height: `calc(100% - ${SHEET_MARGIN}px)`,
            }}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: h }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onTransitionEnd={handleDragTransitionEnd}
          >
            <motion.div
              className="touch-none select-none cursor-grab active:cursor-grabbing"
              onPointerDown={e => {
                e.preventDefault();
                dragControls.start(e);
              }}
            >
              <div className="mx-auto w-12 mt-2 mb-2 h-1.5 rounded-full bg-gray-400" />
            </motion.div>

            <div
              ref={containerRef}
              className="flex-1 overflow-auto overscroll-contain px-5 pb-5 touch-auto"
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
