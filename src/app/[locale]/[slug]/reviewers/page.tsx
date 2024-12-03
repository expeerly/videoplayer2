import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { NextPage } from 'next';

const sampleText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut 
perspiciatis unde omnis iste natus error sit voluptatem accusantium 
doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
veritatis et quasi architecto beatae vitae dicta sunt explicabo.
`.trim();

const Page: NextPage = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-full mx-auto md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex justify-between">
              <PageHeading>Avis Vidéos: Categories de Produit</PageHeading>
              <Filter />
            </div>
            <LongDescription text={sampleText} />
          </div>
        </section>
        <PaginationContainer
          headerData={{
            profileSlug: '/video-reviews/reviewers/reviewer-1',
            title: 'Reviewer 1',
            subTitle: '18 reviews',
            dataType: 'reviewer',
            description: '',
          }}
          dataType="reviewer"
        />

        <SEOSection
          heading="SEO text lorem ipsum"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium dictum felis, at
            porttitor nisi accumsan et. Curabitur volutpat risus at nisi finibus, eget suscipit leo."
        />
      </div>
    </div>
  );
};

export default Page;
