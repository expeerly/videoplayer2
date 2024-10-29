import { Avatar } from "@nextui-org/avatar";
import React from "react";

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
    <div className="absolute bottom-10 left-0 p-4 text-white z-10 ">
      <div className="flex w-full gap-2 items-center">
        <Avatar />{" "}
        <div className="flex  flex-col gap-2 ">
          <h2 className="text-sm font-semibold">@{username}</h2>
          <p className="text-sm">{music}</p>
          <div><span>4.2</span></div>
        </div>
      </div>
    </div>
  );
};
