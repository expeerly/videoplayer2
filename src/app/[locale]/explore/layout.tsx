import React, { FunctionComponent } from 'react';
import Drawer from '../../components/client/Drawer';

const VideoFeedLayout: FunctionComponent = () => {
  return (
    <div className="bg-white fixed z-20 flex justify-between sm:items-center h-full w-full overflow-hidden md:h-[calc(100vh-85px)] md:max-w-[calc(100%-25%)] mid-lg:max-w-[calc(100%-275px)] md:right-0 md:bottom-0">
      <div className="flex-1 h-full transition-all duration-300 ">
        {/* <VideoFeed videos={sampleVideos}></VideoFeed> */}
      </div>
      <Drawer>{/* <VideoDetails /> */}</Drawer>
    </div>
  );
};

export default VideoFeedLayout;
