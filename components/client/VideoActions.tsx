import React from "react";
import { Heart, MessageCircle, Share2, Disc } from "lucide-react";

interface VideoActionsProps {
  likes: number;
  comments: number;
  shares: number;
}

export const VideoActions: React.FC<VideoActionsProps> = ({
  likes,
  comments,
  shares,
}) => {
  return (
    <div className="flex flex-col items-center gap-6 ">
      <button className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 bg-gray-600/40 rounded-full flex items-center justify-center">
          <Heart size={28} />
        </div>
        <span className="text-sm">{likes}</span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 bg-gray-600/40 rounded-full flex items-center justify-center">
          <MessageCircle size={28} />
        </div>
        <span className="text-sm">{comments}</span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 bg-gray-600/40 rounded-full flex items-center justify-center">
          <Share2 size={28} />
        </div>
        <span className="text-sm">{shares}</span>
      </button>

      <button className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 bg-gray-600/40 rounded-full flex items-center justify-center animate-spin-slow">
          <Disc size={28} />
        </div>
      </button>
    </div>
  );
};
