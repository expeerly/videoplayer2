import React, { FunctionComponent } from 'react';
import { Pagination } from '../client/Pagination';
import { ProfileCardProps } from './ProfileCard';
import { ReviewGrid } from './ReviewGrid';
import { CTABlock, CTABlockProps } from './CTABlock';

type Props = {
  headerData?: ProfileCardProps;
  classNames?: {
    containerClassName?: string;
    cardClassName?: string;
    gridClassName?: string;
  };
  totalSections?: number;
  ctaBlock?: CTABlockProps;
};

export const PaginationContainer: FunctionComponent<Props> = ({
  totalSections = 4,
  headerData,
  ctaBlock,
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
            {!!ctaBlock && index === 1 && (
              <div className="hidden md:block">
                <CTABlock {...ctaBlock} />
              </div>
            )}
          </React.Fragment>
        ))}
      <section className="py-8">
        <Pagination totalPages={50} />
      </section>
      {!!ctaBlock && (
        <div className=" md:hidden">
          <CTABlock {...ctaBlock} />
        </div>
      )}
    </div>
  );
};
