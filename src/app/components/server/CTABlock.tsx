import React, { FunctionComponent } from 'react';
import { Button } from '../client/Button';

export type CTABlockProps = {
  heading: string;
  desc: string;
  button: {
    label: string;
    ariaLabel: string;
    href?: string;
  };
};

export const CTABlock: FunctionComponent<CTABlockProps> = ({ heading, desc, button }) => {
  return (
    <section className="py-8">
      <div className="w-full bg-blue-500 px-6 py-8">
        <div className="text-white text-center space-y-1 px-14 md:px-0">
          <h2 className="text-2xl font-extrabold">{heading}</h2>
          <p className="text-base font-normal">{desc}</p>
        </div>

        <Button
          size="lg"
          variant="secondary"
          className="w-full bg-white mt-6 mx-auto sm:w-[300px] text-[#111827]"
          aria-label={button.ariaLabel}
          href={button.href}
          target="_blank"
        >
          {button.label}
        </Button>
      </div>
    </section>
  );
};
