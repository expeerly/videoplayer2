import React, { FunctionComponent } from 'react';
import { PlayIcon } from '@/assets/icons/PlayIcon';
import Image from 'next/image';

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
  className = '',
}) => {
  const sizeClasses: Record<AvatarSize, string> = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const fallbackOptions: Record<AvatarFallback, React.ReactNode> = {
    user: <PlayIcon className="w-full h-full p-2 text-gray-400" />,
    initials: (
      <span className="text-gray-600 font-medium">
        {alt
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()}
      </span>
    ),
  };

  const baseClasses =
    'inline-flex items-center justify-center bg-gray-100 overflow-hidden rounded-full';

  return (
    <div
      className={`${baseClasses} ${sizeClasses[size]} ${className}`.trim()}
      role="img"
      aria-label={alt}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const nextSibling = target.nextSibling as HTMLElement;
            if (nextSibling) {
              nextSibling.style.display = 'flex';
            }
          }}
          height={20}
          width={20}
        />
      ) : (
        fallbackOptions[fallback]
      )}
    </div>
  );
};
