import { NextPage } from 'next';
import { Video } from '../../components/server/Video/VideoCard';
import { VideoFeed } from '../../components/server/Video/VideoFeed';
const sampleVideos: Video[] = [
  {
    id: '1',
    playbackId: 'qs2vN7D3ArOWe7i2sEVgHhlNcaZKayH3mf01i1ujAjKk', // Mountain biking video
    caption: '🚴‍♂️ Epic mountain biking trails! #mtb #adventure',
    username: 'adventu',
    userAvatar: '/avatars/user1.jpg',
    category: 'Adventure',
    brandName: 'Dyson',
    productName: 'Supersonic',
  },
  {
    id: '2',
    playbackId: 'eucj4y2BPU1GaxZe43zlF01xHYWQJZdtgqAvaCsw02jks', // Surfing video
    caption: '🌊 Catching waves in paradise #surf #ocean',
    username: 'surflife',
    userAvatar: '/avatars/user2.jpg',
    category: 'Adventure',
    brandName: 'Dyson',
    productName: 'Supersonic',
  },
  {
    id: '3',
    playbackId: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe', // Dance video
    caption: '💃 New dance challenge! #dance #viral',
    username: 'dancepro',
    userAvatar: '/avatars/user3.jpg',
    category: 'Adventure',
    brandName: 'Dyson',
    productName: 'Supersonic',
  },
  {
    id: '4',
    playbackId: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe', // City timelapse
    caption: '🌆 NYC never sleeps #timelapse #citylife',
    username: 'urbanexplorer',
    userAvatar: '/avatars/user4.jpg',
    category: 'Adventure',
    brandName: 'Dyson',
    productName: 'Supersonic',
  },
  {
    id: '5',
    playbackId: 'DS00Spx1CV902MCtPj5WknGlR102V5HFkDe', // Cooking video
    caption: '👨‍🍳 Easy 5-minute recipe! #cooking #foodie',
    username: 'chefmaster',
    userAvatar: '/avatars/user5.jpg',
    category: 'Adventure',
    brandName: 'Dyson',
    productName: 'Supersonic',
  },
];
const Page: NextPage = () => {
  return (
    <div>
      <VideoFeed videos={sampleVideos} />
    </div>
  );
};

export default Page;
