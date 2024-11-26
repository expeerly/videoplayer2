'use client';
import React, { FunctionComponent } from 'react';
import { ReviewGrid } from '../server/ReviewGrid';
import { BecomeReviewer } from './BecomeReviewer';
import Pagination from './Pagination';
import { ProfileCardProps } from './ProfileCard';

type ReviewGridProps = {
  headerData?: ProfileCardProps;
  classNames?: {
    containerClassName?: string;
    cardClassName?: string;
    gridClassName?: string;
  };
  totalSections?: number;
  isBecomeReviewer?: boolean;
};

export const PaginationContainer: FunctionComponent<ReviewGridProps> = ({
  headerData,
  totalSections = 4,
  isBecomeReviewer = true,
}) => {
  return (
    <div>
      {Array(totalSections)
        .fill(null)
        .map((_, index) => (
          <React.Fragment key={index}>
            <section className="py-4 md:py-8">
              <ReviewGrid
                headerData={headerData}
                classNames={{ gridClassName: 'md:flex-wrap md:gap-[15.5px] md:px-0' }}
                maxReviews={9}
              />
            </section>
            {isBecomeReviewer && index === 1 && (
              <div className="hidden md:block">
                <BecomeReviewer />
              </div>
            )}
          </React.Fragment>
        ))}
      <section className="py-8">
        <Pagination currentPage={1} totalPages={100} onPageChange={page => console.log(page)} />
      </section>
      <div className=" md:hidden">
        <BecomeReviewer />
      </div>
    </div>
  );
};
