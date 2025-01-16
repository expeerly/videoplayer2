import React, { FunctionComponent } from 'react';
import { ReviewCard } from '../server/ReviewCard';
import { ProfileCard } from './ProfileCard';
import clsx from 'clsx';
import { GridData } from '@/src/db/types';

type ReviewGridProps = {
  header?: {
    dataType?: 'reviewer' | 'brand' | 'category';
    variant?: 'primary' | 'secondary';
  };

  classNames?: {
    containerClassName?: string;
    cardClassName?: string;
    gridClassName?: string;
    headerContainerClassName?: string;
    headerProfileClassName?: string;
  };
  hasProfileHeader?: boolean;
  data?: GridData;
};
export const ReviewGrid: FunctionComponent<ReviewGridProps> = ({
  header,
  classNames,
  hasProfileHeader = true,
  data,
}) => {
  return (
    <div className={clsx('w-full flex flex-col gap-5', classNames?.containerClassName)}>
      {hasProfileHeader && (
        <div className={clsx('pl-5 mid-lg:pl-0', classNames?.headerContainerClassName)}>
          <ProfileCard
            {...data?.info}
            imageUrl={data?.logo}
            title={data?.name ?? ''}
            profileSlug={data?.slug}
            {...header}
          />
        </div>
      )}

      <div
        className={clsx(
          'flex gap-[9px] overflow-x-auto scrollbar-thin scrollbar-none justify-start w-full px-5 mid-lg:px-0 md:gap-4',
          classNames?.gridClassName
        )}
      >
        {data?.videos?.map((review, i) => (
          <ReviewCard
            key={`${review.id}-i-${i}`}
            review={review}
            className={classNames?.cardClassName}
          />
        ))}
      </div>
    </div>
  );
};
