"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

const VideoThumbnail = ({
  playbackID,
  setLoadedState,
  lazyloadState = false,
  loadedState,
  isMobile,
}: {
  playbackID: string;
  setLoadedState?: Dispatch<SetStateAction<boolean>>;
  lazyloadState?: boolean;
  loadedState?: boolean;
  isMobile?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const ThumbnailURL = {
    url: isMobile
      ? `https://image.mux.com/${playbackID}/thumbnail.webp?width=150&time=1`
      : `https://image.mux.com/${playbackID}/thumbnail.webp?width=220&time=1`,
    gif: `https://image.mux.com/${playbackID}/animated.webp?width=150&fps=10`,
    placeholder: `https://image.mux.com/${playbackID}/thumbnail.webp?time=1&width=50`,
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        alt="thumbnail"
        blurDataURL={ThumbnailURL.placeholder}
        height={0}
        placeholder="blur"
        priority={lazyloadState ? true : false}
        sizes="(min-width: 640px) 220px , (max-width:639px):150px"
        src={ThumbnailURL.url}
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        width={0}
        onLoad={() => setLoadedState?.(true)}
        onMouseEnter={() => isMobile != true && setIsVisible(true)}
      />
      {isMobile != true && isVisible && (
        <Image
          unoptimized
          alt="thumbnail"
          height={0}
          sizes="220px"
          src={ThumbnailURL.gif}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          width={0}
          onLoad={() => setLoadedState?.(true)}
          onMouseLeave={() => setIsVisible(false)}
        />
      )}
    </div>
  );
};

export default VideoThumbnail;
