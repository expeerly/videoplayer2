import { Metadata } from "next/types";

import { BrandsPage } from "@/components/client/BrandsPage";

interface VideoReviewsBrandPageProps {
  searchParams: {
    brand?: string;
    category?: string;
  };
}

export const metadata: Metadata = {
  title: "Video Reviews by Brand - Expeerly",
  description: "Browse video reviews filtered by brand",
};

const sampleVideos = [
  {
    id: "1",
    playbackId: "DS00Spx1CV902MCtPj5WknGlR102V5HFkDe", // Mountain biking video
    caption: "🚴‍♂️ Epic mountain biking trails! #mtb #adventure",
    username: "adventu",
    likes: 15420,
    comments: 234,
    shares: 89,
    userAvatar: "/avatars/user1.jpg",
    music: "🎵 Adventure Time ",
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
    music: "🎵 Ocean Waves - Surf Dreams",
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
    music: "🎵 Dance With Me - Pop Hits",
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
    music: "🎵 City Lights - Urban Beats",
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
    music: "🎵 Kitchen Vibes - Cooking Mood",
  },
];

export default function VideoReviewsBrandPage({
  searchParams,
}: VideoReviewsBrandPageProps) {
  return (
    <div className="container mx-auto max-w-[532px]">
      <BrandsPage />
    </div>
  );
}
