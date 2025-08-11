import React, { FunctionComponent } from 'react';
import { Pagination } from '../client/Pagination';
import { ReviewGrid } from './ReviewGrid';
import { Grid } from '@/src/db/types';
import { CTABlock, CTABlockProps } from './CTABlock';

type Props = {
  header?: {
    dataType?: 'brand' | 'brand-feed' | 'category' | 'product-feed' | 'reviewer';
    variant?: 'primary' | 'secondary';
  };
  classNames?: {
    containerClassName?: string;
    cardClassName?: string;
    gridClassName?: string;
  };
  data: Grid;
  ctaBlock: CTABlockProps;
};

export const PaginationContainer: FunctionComponent<Props> = ({ data, header, ctaBlock }) => {
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
          {!!ctaBlock && index === 1 && (
            <div className="hidden md:block">
              <CTABlock {...ctaBlock} />
            </div>
          )}
        </React.Fragment>
      ))}
      {Number(data?.total) > 4 && (
        <section className="py-8">
          <Pagination totalPages={Math.ceil(data?.total / 4)} />
        </section>
      )}
      {!!ctaBlock && (
        <div className=" md:hidden">
          <CTABlock {...ctaBlock} />
        </div>
      )}
    </div>
  );
};
