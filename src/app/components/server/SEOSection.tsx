import React, { FunctionComponent } from 'react';

type Props = {
  content: string;
};

export const SEOSection: FunctionComponent<Props> = ({ content }) => {
  return (
    <section className="max-w-[460px] mx-auto py-10 px-5 md:px-0">
      <p className="text-grey-700 text-sm md:text-base font-normal">{content}</p>
    </section>
  );
};
