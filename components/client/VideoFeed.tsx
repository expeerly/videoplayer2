"use client";
import React, { useRef, useEffect, useState } from "react";

import { VideoCard } from "./VideoCard";

import { Video } from "@/types";

interface VideoFeedProps {
  videos: Video[];
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ videos }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current) {
        const index = Math.round(
          feedRef.current.scrollTop / window.innerHeight,
        );

        setActiveVideoIndex(index);
      }
    };

    const feedElement = feedRef.current;

    if (feedElement) {
      feedElement.addEventListener("scroll", handleScroll);

      return () => feedElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={feedRef}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide overflow-x-hidden"
    >
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          isVisible={index === activeVideoIndex}
          video={video}
        />
      ))}
    </div>
  );
};
