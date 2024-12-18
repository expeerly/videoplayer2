import { Video } from '@/src/app/components/server/Video/VideoCard';
import { VideoFeed } from '@/src/app/components/server/Video/VideoFeed';
import React, { FunctionComponent } from 'react';
import { VideoDetails } from '../../components/server/Video/VideoDetails';
import Drawer from '../../components/client/Drawer';

export const sampleVideos: Video[] = [
  {
    id: '1',
    playbackId: 'qs2vN7D3ArOWe7i2sEVgHhlNcaZKayH3mf01i1ujAjKk',
    caption: '🚴‍♂️ Epic mountain biking trails! #mtb #adventure',
    username: 'adventu',
    userAvatar: '/avatars/user1.jpg',
    category: 'Adventure',
    brandName: 'Dyson',
    productName: 'Supersonic',
    rating: 2.3,
  },
  {
    id: '2',
    playbackId: 'eucj4y2BPU1GaxZe43zlF01xHYWQJZdtgqAvaCsw02jks',
    caption: '🌊 Catching waves in paradise #surf #ocean',
    username: 'surflife',
    userAvatar: '/avatars/user2.jpg',
    category: 'Adventure',
    brandName: 'Dyson',
    productName: 'Supersonic',
    rating: 4.3,
  },
  {
    id: '3',
    playbackId: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe',
    caption: '💃 New dance challenge! #dance #viral',
    username: 'dancepro',
    userAvatar: '/avatars/user3.jpg',
    category: 'Adventure',
    brandName: 'Dyson',
    productName: 'Supersonic',
    rating: 3.3,
  },
];

const VideoFeedLayout: FunctionComponent = () => {
  return (
    <div className="bg-white fixed z-20 flex justify-between sm:items-center h-full w-full overflow-hidden md:h-[calc(100vh-85px)] md:max-w-[calc(100%-25%)] mid-lg:max-w-[calc(100%-275px)] md:right-0 md:bottom-0">
      <div className="flex-1 h-full transition-all duration-300 ">
        <VideoFeed videos={sampleVideos}></VideoFeed>
      </div>
      <Drawer>
        <VideoDetails />
      </Drawer>
    </div>
  );
};

export default VideoFeedLayout;
