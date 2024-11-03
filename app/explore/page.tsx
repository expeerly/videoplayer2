import { NextPage } from "next";

import { VideoFeed } from "@/components/client/VideoFeed";
import { Video } from "@/types";

const sampleVideos: Video[] = [
  {
    id: "1",
    playbackId: "DS00Spx1CV902MCtPj5WknGlR102V5HFkDe", // Mountain biking video
    caption: "🚴‍♂️ Epic mountain biking trails! #mtb #adventure",
    username: "adventu",
    likes: 15420,
    comments: 234,
    shares: 89,
    userAvatar: "/avatars/user1.jpg",
    category: "Adventure",
    brandName: "Dyson",
    productName: "Supersonic",
  },
  {
    id: "2",
    playbackId: "O6LZn01200914eG02CYpD02tqr01q00ZF02EY", // Surfing video
    caption: "🌊 Catching waves in paradise #surf #ocean",
    username: "surflife",
    likes: 23410,
    comments: 445,
    shares: 167,
    userAvatar: "/avatars/user2.jpg",
    category: "Adventure",
    brandName: "Dyson",
    productName: "Supersonic",
  },
  {
    id: "3",
    playbackId: "VZtzUzGRv02WxRPPZ37EYw02u1O2AzMYfmZ", // Dance video
    caption: "💃 New dance challenge! #dance #viral",
    username: "dancepro",
    likes: 45200,
    comments: 892,
    shares: 1204,
    userAvatar: "/avatars/user3.jpg",
    category: "Adventure",
    brandName: "Dyson",
    productName: "Supersonic",
  },
  {
    id: "4",
    playbackId: "E3l2OgwUO02zIxHo02Xse3h00CYBujxxKDQWc", // City timelapse
    caption: "🌆 NYC never sleeps #timelapse #citylife",
    username: "urbanexplorer",
    likes: 18920,
    comments: 342,
    shares: 567,
    userAvatar: "/avatars/user4.jpg",
    category: "Adventure",
    brandName: "Dyson",
    productName: "Supersonic",
  },
  {
    id: "5",
    playbackId: "v69RSHhFelSm4701snP8MTyZz2izi02A4B4qv", // Cooking video
    caption: "👨‍🍳 Easy 5-minute recipe! #cooking #foodie",
    username: "chefmaster",
    likes: 12543,
    comments: 423,
    shares: 234,
    userAvatar: "/avatars/user5.jpg",
    category: "Adventure",
    brandName: "Dyson",
    productName: "Supersonic",
  },
];
const ExplorePage: NextPage = () => {
  return (
    <div className="flex w-full scrollbar-hide justify-center h-full  ">
      <VideoFeed videos={sampleVideos} />
    </div>
  );
};

export default ExplorePage;
