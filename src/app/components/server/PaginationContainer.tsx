import React, { FunctionComponent, ReactNode } from 'react';
import { Pagination } from '../client/Pagination';
import { ProfileCardProps } from './ProfileCard';
import { ReviewGrid } from './ReviewGrid';
import { BecomeReviewer } from './BecomeReviewer';

type Props = {
  headerData?: ProfileCardProps;
  classNames?: {
    containerClassName?: string;
    cardClassName?: string;
    gridClassName?: string;
  };
  totalSections?: number;
  isBecomeReviewer?: ReactNode;
  dataType?: 'reviewer' | 'brand' | 'category';
};

export const PaginationContainer: FunctionComponent<Props> = ({
  totalSections = 4,
  isBecomeReviewer = true,
  headerData,
  dataType,
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
            {isBecomeReviewer && index === 1 && (
              <div className="hidden md:block">
                <BecomeReviewer isReviewer={dataType === 'reviewer'} />
              </div>
            )}
          </React.Fragment>
        ))}
      <section className="py-8">
        <Pagination totalPages={50} />
      </section>
      {isBecomeReviewer && (
        <div className=" md:hidden">
          <BecomeReviewer isReviewer={dataType === 'reviewer'} />
        </div>
      )}
    </div>
  );
};
