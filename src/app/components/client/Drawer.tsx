'use client';
import ismobile from 'is-mobile';
import React, { FunctionComponent, PropsWithChildren, useCallback } from 'react';
import { MobileDrawer } from './MobileDrawer';
import { DesktopDrawer } from './DescktopDrawer';
import { useSharedDispatch, useSharedState } from '../../context/reducer';

const Drawer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const isMobile = ismobile();
  const dispatch = useSharedDispatch();
  const { videoDetailsDrawer } = useSharedState();

  const handleClose = useCallback(() => {
    dispatch({
      type: 'VIDEO_DETAILS_DRAWER',
      payload: false,
    });
  }, [dispatch]);

  return (
    <>
      {isMobile ? (
        <MobileDrawer isOpen={videoDetailsDrawer} onClose={handleClose}>
          {children}
        </MobileDrawer>
      ) : (
        <DesktopDrawer isOpen={videoDetailsDrawer} onClose={handleClose}>
          {children}
        </DesktopDrawer>
      )}
    </>
  );
};

export default Drawer;
