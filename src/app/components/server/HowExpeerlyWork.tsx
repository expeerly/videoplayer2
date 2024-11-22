import React, { FunctionComponent } from 'react';
import { getDictionary } from '@/src/lib/dictionary';
import { StyledLink } from './StyledLink';

export const HowExpeerlyWorks: FunctionComponent = async () => {
  const t = await getDictionary();

  return (
    <section className="w-full mt-12 mb-8 px-5 md:my-16 ">
      <div className="sm:w-[460px] w-auto mx-auto text-start sm:text-center">
        <h2 className="text-xl md:text-2xl text-center font-extrabold mb-4">
          {t.home_h2_how_expeerly_works}
        </h2>
        <p className="text-grey-700 mb-6 w-full sm:max-w-2xl mx-auto">
          {t.home_how_it_works_body_text}
        </p>
        <StyledLink
          size="lg"
          className="w-full sm:w-[300px] mx-auto"
          href="https://www.get.expeerly.com/about-us"
          variant="outline"
          aria-label={t.learn_more.aria_label}
        >
          {t.learn_more.label}
        </StyledLink>
      </div>
    </section>
  );
};
