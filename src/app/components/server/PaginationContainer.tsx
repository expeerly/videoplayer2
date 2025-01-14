import React, { FunctionComponent, ReactNode } from 'react';
import { Pagination } from '../client/Pagination';
import { ReviewGrid } from './ReviewGrid';
import { BecomeReviewer } from './BecomeReviewer';
import { Grid } from '@/src/db/types';

type Props = {
  header?: {
    dataType?: 'reviewer' | 'brand' | 'category';
    variant?: 'primary' | 'secondary';
  };
  classNames?: {
    containerClassName?: string;
    cardClassName?: string;
    gridClassName?: string;
  };
  isBecomeReviewer?: ReactNode;
  data: Grid;
};

export const PaginationContainer: FunctionComponent<Props> = ({
  isBecomeReviewer = true,
  data,
  header,
}) => {
  return (
    <div>
      {data?.rows?.map((i, index) => (
        <React.Fragment key={index}>
          <section className="py-4 md:py-8">
            <ReviewGrid
              header={header}
              data={i}
              classNames={{
                gridClassName: 'md:flex-wrap md:gap-[15.5px] md:px-0',
                headerContainerClassName: 'md:pl-0',
              }}
            />
          </section>
          {isBecomeReviewer && index === 1 && (
            <div className="hidden md:block">
              <BecomeReviewer isReviewer={header?.dataType === 'reviewer'} />
            </div>
          )}
        </React.Fragment>
      ))}
      <section className="py-8">
        <Pagination totalPages={Math.ceil(data?.total / 4)} />
      </section>
      {isBecomeReviewer && (
        <div className=" md:hidden">
          <BecomeReviewer isReviewer={header?.dataType === 'reviewer'} />
        </div>
      )}
    </div>
  );
};
