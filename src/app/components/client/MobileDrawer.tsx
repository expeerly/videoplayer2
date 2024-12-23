import { FunctionComponent, PropsWithChildren, useEffect, useRef } from 'react';
import {
  AnimatePresence,
  motion,
  animate,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  PanInfo,
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
  const currentRef = useRef<HTMLDivElement>(null);
  const h = window.innerHeight - SHEET_MARGIN;
  const y = useMotionValue(h);
  const bgOpacity = useTransform(y, [0, h], [0.4, 0]);
  const bg = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;

  // Prevent body scroll when drawer is open
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

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo
  ) => {
    if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
      onClose();
    } else {
      animate(y, 0, {
        type: 'inertia',
        bounceStiffness: 300,
        bounceDamping: 40,
        timeConstant: 300,
        min: 0,
        max: 0,
      });
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 overscroll-none"
          style={{ backgroundColor: bg }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="bg-white absolute w-full  rounded-t-xl shadow-lg"
            initial={{ y: h }}
            animate={{ y: 0 }}
            exit={{ y: h }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            style={{
              y,
              top: SHEET_MARGIN,
              height: `calc(100% - ${SHEET_MARGIN}px)`,
            }}
            drag="y"
            dragConstraints={{ top: 0 }}
            onDragEnd={handleDragEnd}
          >
            <div className="mx-auto w-12 mt-2 h-1.5 rounded-full bg-gray-400" />

            <motion.div className="drawer-content h-full -z-10 pt-3" ref={currentRef}>
              <div className="h-full px-5 pb-5 overflow-auto">{children}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
