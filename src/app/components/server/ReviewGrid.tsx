import React, { FunctionComponent } from 'react';
import { ReviewCard } from '../server/ReviewCard';
import { ProfileCard } from './ProfileCard';
import clsx from 'clsx';
import { GridData } from '@/src/db/types';
import { Skeleton } from '../client/Skeleton';

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

export const ReviewGridSkeleton: FunctionComponent<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="w-full bg-white">
      <div className="w-full mx-auto md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-10 w-10 md:h-14 md:w-14 rounded-full" />
              <div className="flex flex-1 flex-col">
                <Skeleton className="h-8 w-48" />
                <div className="flex gap-1 mt-2">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-[9px] flex-wrap">
              {Array.from({ length: count }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-[167px] " />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
