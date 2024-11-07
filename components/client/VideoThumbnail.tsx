"use client";
import Image from "next/image";
import { FunctionComponent, useState } from "react";

type Props = {
  playbackID: string
}

export const VideoThumbnail:FunctionComponent<Props> = ({
  playbackID,
}: {
  playbackID: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const ThumbnailURL = {
    url: 
      `https://image.mux.com/${playbackID}/thumbnail.webp?width=220&time=1`,
    gif: `https://image.mux.com/${playbackID}/animated.webp?width=150&fps=10`,
    placeholder: `https://image.mux.com/${playbackID}/thumbnail.webp?time=1&width=50`,
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        onMouseEnter={() => setIsVisible(true)}
        priority={false}
        src={ThumbnailURL.url}
        alt="thumbnail"
        placeholder="blur"
        blurDataURL={ThumbnailURL.placeholder}
        width={0}
        height={0}
        sizes="(min-width: 640px) 220px , (max-width:639px):150px"
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      {isVisible && (
        <Image
          onMouseLeave={() => setIsVisible(false)}
          unoptimized
          src={ThumbnailURL.gif}
          alt="thumbnail"
          width={0}
          height={0}
          sizes="220px"
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
        />
      )}
    </div>
  );
};