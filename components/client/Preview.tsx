"use client";
import { useState, useEffect, useRef } from "react";
import MuxPlayer, { MuxPlayerRefAttributes } from "@mux/mux-player-react";

interface Video {
  id: string;
  title: string;
  playbackId: string;
  duration: number;
  views?: number;
}

interface MuxSegmentPreviewProps {
  video: Video;
  onVideoClick: (videoId: string) => void;
}

const MuxSegmentPreview: React.FC<MuxSegmentPreviewProps> = ({
  video,
  onVideoClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const playerRef = useRef<MuxPlayerRefAttributes>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Define preview segments (start and end times for different parts of the video)
  const previewSegments = [
    { start: 0, end: 2 }, // First 2 seconds
    {
      start: Math.floor(video.duration / 3),
      end: Math.floor(video.duration / 3) + 2,
    }, // Middle segment
    {
      start: Math.max(0, video.duration - 4),
      end: Math.max(2, video.duration - 2),
    }, // End segment
  ];

  useEffect(() => {
    if (isHovered) {
      // Start playing segments when hovered
      playNextSegment();
    } else {
      // Clean up when not hovered
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setCurrentSegment(0);
      if (playerRef.current) {
        playerRef.current.currentTime = 0;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHovered]);

  const playNextSegment = () => {
    if (!playerRef.current) return;

    const segment = previewSegments[currentSegment];
    playerRef.current.currentTime = segment.start;

    // Set timeout to move to next segment
    timeoutRef.current = setTimeout(
      () => {
        const nextSegment = (currentSegment + 1) % previewSegments.length;
        setCurrentSegment(nextSegment);
        playNextSegment();
      },
      (segment.end - segment.start) * 1000
    ); // Convert to milliseconds
  };

  return (
    <div
      className="relative w-full aspect-[9/16] rounded-lg overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onVideoClick(video.id)}
    >
      <MuxPlayer
        ref={playerRef}
        playbackId={video.playbackId}
        metadata={{
          video_title: video.title,
          player_name: "Segment Preview Player",
        }}
        streamType="on-demand"
        className="w-full h-full object-cover"
        autoPlay={false}
        muted
        preload="metadata"
        thumbnailTime={10}
        preferPlayback={"mse"}
        style={{
          aspectRatio: "9/16",
          height: "100%",
          width: "100%",
        }}
      />

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        {previewSegments.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all duration-200 ${
              index === currentSegment
                ? "bg-white"
                : index < currentSegment
                  ? "bg-white/50"
                  : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Video Info Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
          <h3 className="text-white font-medium line-clamp-2">{video.title}</h3>
          <div className="flex items-center space-x-2 text-white/80 text-sm">
            {video.views && <span>{video.views.toLocaleString()} views</span>}
            <span>
              {Math.floor(video.duration / 60)}:
              {String(Math.floor(video.duration % 60)).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuxSegmentPreview;
