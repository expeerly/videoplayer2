import React, { FunctionComponent } from 'react';

type Props = {
  heading: string;
  content: string;
};

export const SEOSection: FunctionComponent<Props> = ({ heading, content }) => {
  return (
    <section className="max-w-[460px] mx-auto py-10 px-5 md:px-0">
      <h2 className="text-2xl font-extrabold text-grey-700 mb-4 md:text-center ">{heading}</h2>
      <p className="text-grey-700 text-base font-normal">{content}</p>
    </section>
  );
};
