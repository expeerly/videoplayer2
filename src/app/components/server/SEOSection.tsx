import React, { FunctionComponent } from 'react';
import { LongDescription } from '../client/LongDescription';

type Props = {
  content: string;
};

export const SEOSection: FunctionComponent<Props> = ({ content }) => {
  return (
    <section className="max-w-[460px] mx-auto py-10 px-5 md:px-0">
      <LongDescription text={content} scrollToTop={false} />
    </section>
  );
};
