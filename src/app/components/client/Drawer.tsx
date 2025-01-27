'use client';
import ismobile from 'is-mobile';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { MobileDrawer } from './MobileDrawer';
import { DesktopDrawer } from './DescktopDrawer';
import { useSharedDispatch, useSharedState } from '../../context/reducer';
import { VideoDetails } from './VideoDetails';
import { VideoDetail } from '@/src/db/types';
import { useApiCall } from '@/src/hooks/useApi';
import { useParams } from 'next/navigation';
import { Spinner } from './Spinner';

const Drawer: FunctionComponent = () => {
  const [video, setVideo] = useState<VideoDetail>();
  const isMobile = ismobile();
  const dispatch = useSharedDispatch();
  const { videoDetailsDrawer } = useSharedState();
  const { get, loading } = useApiCall();
  const params = useParams();

  const handleClose = useCallback(() => {
    dispatch({
      type: 'VIDEO_DETAILS_DRAWER',
      payload: false,
    });
  }, [dispatch]);

  const fetchVideoDetail = useCallback(async () => {
    const res = await get<VideoDetail>(`/video/${params.videoId}/?metaInfo=true`);
    if (res?.success) {
      setVideo(res.data);
    }
  }, [params, get]);

  useEffect(() => {
    if (videoDetailsDrawer) {
      fetchVideoDetail();
    }
  }, [videoDetailsDrawer, params, fetchVideoDetail]);

  return (
    <>
      {isMobile ? (
        <MobileDrawer isOpen={videoDetailsDrawer} onClose={handleClose}>
          <h1 className="text-3xl text-black">{isMobile}</h1>
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <VideoDetails data={video} />
          )}
        </MobileDrawer>
      ) : (
        <DesktopDrawer isOpen={videoDetailsDrawer} onClose={handleClose}>
          <h1 className="text-3xl text-black">{isMobile}</h1>
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <VideoDetails data={video} />
          )}
        </DesktopDrawer>
      )}
    </>
  );
};

export default Drawer;
