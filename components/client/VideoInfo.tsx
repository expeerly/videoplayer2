import React from "react";
import { Music } from "lucide-react";

interface VideoInfoProps {
  username: string;
  caption: string;
  music: string;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({
  username,
  caption,
  music,
}) => {
  return (
    <div className="absolute bottom-0 left-0 p-4 text-white z-10 max-w-[80%]">
      <h2 className="text-lg font-semibold mb-1">@{username}</h2>
      <p className="text-sm mb-3">{caption}</p>
      <div className="flex items-center gap-2">
        <Music size={16} />
        <p className="text-sm font-medium">{music}</p>
      </div>
    </div>
  );
};
