'use client';
import React, { FunctionComponent, ReactNode } from 'react';
import { Pagination } from './Pagination';
import { ProfileCardProps } from './ProfileCard';
import { ReviewGrid } from '../server/ReviewGrid';

type Props = {
  headerData?: ProfileCardProps;
  classNames?: {
    containerClassName?: string;
    cardClassName?: string;
    gridClassName?: string;
  };
  totalSections?: number;
  becomeReviewer?: ReactNode;
};

export const PaginationContainer: FunctionComponent<Props> = ({
  totalSections = 4,
  becomeReviewer,
  headerData,
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
                classNames={{
                  gridClassName: 'md:flex-wrap md:gap-[15.5px] md:px-0',
                  headerContainerClassName: 'md:pl-0',
                }}
                maxReviews={9}
              />
            </section>
            {becomeReviewer && index === 1 && (
              <div className="hidden md:block">{becomeReviewer}</div>
            )}
          </React.Fragment>
        ))}
      <section className="py-8">
        <Pagination totalPages={50} onPageChange={page => console.log(page)} />
      </section>
      {becomeReviewer && <div className=" md:hidden">{becomeReviewer}</div>}
    </div>
  );
};
