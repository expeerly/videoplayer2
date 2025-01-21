import React from 'react';
import { ReviewGrid } from '@/src/app/components/server/ReviewGrid';
import { getDictionary } from '@/src/lib/dictionary';
import { Button } from '../client/Button';
import { getGridVideos } from '../../actions/actions';
import { Languages } from '@/src/db/types';

export const ExploreReviewers: React.FunctionComponent<{ locale: Languages }> = async ({
  locale,
}) => {
  const [{ t }, { data }] = await Promise.all([
    getDictionary(),
    getGridVideos(locale, 'creator', 1, 2, 5, true),
  ]);

  return (
    <section className="flex flex-col gap-8 w-full py-12  md:pt-14 md:pb-[70px] md:max-w-[900px]">
      <h2 className="px-5 font-extrabold text-2xl text-center text-grey-700 sm:w-1/2 md:w-2/3 lg:w-2/4 sm:text-start mid-lg:px-0">
        {t('home_h2')}
      </h2>

      {data?.rows?.map(i => (
        <ReviewGrid
          key={i.id}
          data={i}
          header={{
            dataType: 'reviewer',
          }}
        />
      ))}

      <div className="w-full sm:max-w-[300px] px-5 mid-lg:px-0">
        <Button
          title={t('explore_all_reviewers.label')}
          aria-label={t('explore_all_reviewers.aria_label')}
          href="/video-reviews/reviewer"
          size="lg"
          variant="primary"
          fullWidth
        >
          {t('explore_all_reviewers.label')}
        </Button>
      </div>
    </section>
  );
};
