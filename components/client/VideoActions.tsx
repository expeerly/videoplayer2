"use client";
import React, { FunctionComponent, useState } from "react";
import Image from "next/image";

import { ShareDailog } from "./ShareDailog";

import { HeartIcon, MoreIcon, ShareIcon } from "@/assets/icons";
import emoji from "@/assets/images/emoji.png";

type VideoActionsProps = {
  likes: number;
  comments: number;
  shares: number;
  moreHandler: () => void;
};

export const VideoActions: FunctionComponent<VideoActionsProps> = ({
  likes,
  comments,
  shares,
  moreHandler,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-6 ">
      <button className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 bg-grey-700/50 rounded-full flex items-center justify-center">
          <Image alt="emoji" height={24} src={emoji} width={24} />
        </div>
        <span className="text-sm">{likes}</span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 bg-grey-700/50 rounded-full flex items-center justify-center">
          <HeartIcon />
        </div>
        <span className="text-sm">{comments}</span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 bg-grey-700/50 rounded-full flex items-center justify-center">
          <ShareIcon onClick={() => setIsOpen(true)} />
        </div>
        <span className="text-sm">{shares}</span>
      </button>

      <button
        className="flex flex-col items-center gap-1"
        onClick={moreHandler}
      >
        <div className="w-12 h-12 bg-grey-700/50 rounded-full flex items-center justify-center animate-spin-slow">
          <MoreIcon />
        </div>
      </button>

      <ShareDailog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
