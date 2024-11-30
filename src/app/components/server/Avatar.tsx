import React, { FunctionComponent } from 'react';
import { PlayIcon } from '@/src/assets/icons/PlayIcon';
import Image from 'next/image';
import clsx from 'clsx';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarFallback = 'user' | 'initials';

type AvatarProps = {
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  fallback?: AvatarFallback;
  className?: string;
};

export const Avatar: FunctionComponent<AvatarProps> = ({
  src = null,
  alt = 'User avatar',
  size = 'md',
  fallback = 'initials',
  className,
}) => {
  const sizeClasses: Record<AvatarSize, string> = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  };

  const fallbackOptions: Record<AvatarFallback, React.ReactNode> = {
    user: <PlayIcon className="w-full h-full p-2" />,
    initials: (
      <span className="text-grey-700 font-medium">
        {alt
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()}
      </span>
    ),
  };

  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center bg-grey-200 overflow-hidden rounded-full',
        sizeClasses[size],
        className
      )}
      role="img"
      aria-label={alt}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          height={20}
          width={20}
        />
      ) : (
        fallbackOptions[fallback]
      )}
    </div>
  );
};
