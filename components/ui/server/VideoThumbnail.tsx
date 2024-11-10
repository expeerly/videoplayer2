import Image from 'next/image';
import { FunctionComponent } from 'react';

type Props = {
  playbackID: string;
};

export const VideoThumbnail: FunctionComponent<Props> = ({
  playbackID,
}: {
  playbackID: string;
}) => {
  const ThumbnailURL = {
    url: `https://image.mux.com/${playbackID}/thumbnail.webp?width=220&time=1`,
    gif: `https://image.mux.com/${playbackID}/animated.webp?width=150&fps=10`,
    placeholder: `https://image.mux.com/${playbackID}/thumbnail.webp?time=1&width=50`,
  };

  return (
    <div className="group relative h-full w-full">
      <Image
        priority={false}
        src={ThumbnailURL.url}
        alt="thumbnail"
        placeholder="blur"
        blurDataURL={ThumbnailURL.placeholder}
        width={0}
        height={0}
        sizes="(min-width: 640px) 220px , (max-width:639px):150px"
        className="h-full w-full object-contain bg-black flex items-center justify-center"
      />
      <Image
        unoptimized
        src={ThumbnailURL.gif}
        alt="thumbnail"
        width={0}
        height={0}
        sizes="220px"
        className="absolute top-0 left-0 w-full h-full object-contain flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
};
