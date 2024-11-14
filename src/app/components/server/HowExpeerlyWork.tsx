import React, { FunctionComponent } from 'react';
import { getDictionary } from '@/src/lib/dictionary';
import { Button } from '@/src/app/components/server/Button';

export const HowExpeerlyWorks: FunctionComponent = async () => {
  const t = await getDictionary();

  return (
    <section className="w-full mt-12 mb-8 px-5 md:my-16 ">
      <div className="sm:w-[460px] w-auto mx-auto text-start sm:text-center">
        <h2 className="text-xl md:text-2xl text-center font-extrabold mb-4">
          {t.home_h2_how_expeerly_works}
        </h2>
        <p className="text-[#0E0E0F] mb-6 w-full sm:max-w-2xl mx-auto">
          {t.home_how_it_works_body_text}
        </p>
        <Button size="lg" className="w-full sm:w-[300px] mx-auto" href="#" variant="outline">
          {t.cta_button_how_it_works}
        </Button>
      </div>
    </section>
  );
};
