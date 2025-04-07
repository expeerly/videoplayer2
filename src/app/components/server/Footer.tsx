import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/src/lib/dictionary';

export const Footer: FunctionComponent = async () => {
  const { t } = await getDictionary();

  return (
    <footer
      className={`w-full md:max-w-[75.1%] mid-lg:max-w-[calc(100%-274px)] border-l ml-auto px-5 pt-8 pb-14 border-t bg-white md:pb-8 `}
    >
      <div className="max-w-4xl mx-auto  pt-4 flex justify-center">
        <div className="grid gap-6   sm:grid-cols-3 grid-cols-2 w-[660px]  sm:gap-4 text-sm mb-4">
          <div className="flex flex-col gap-6">
            <Link
              href="mailto:hello@expeerly.com"
              className="text-grey-700 font-bold"
              aria-label={t('contact_us.aria_label')}
            >
              {t('contact_us.label')}
            </Link>
            <Link
              href="https://www.get.expeerly.com/terms-and-conditions-companies"
              className="text-grey-700 font-bold"
              aria-label={t('terms_companies.aria_label')}
              target="_blank"
            >
              {t('terms_companies.label')}
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <Link
              href="https://www.get.expeerly.com/"
              className="text-grey-700 font-bold"
              aria-label={t('about_us.aria_label')}
              target="_blank"
            >
              {t('about_us.label')}
            </Link>
            <Link
              href="https://www.get.expeerly.com/terms-and-conditions-creators"
              className="text-grey-700 font-bold"
              aria-label={t('terms_reviewers.aria_label')}
              target="_blank"
            >
              {t('terms_reviewers.label')}
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <Link
              href="https://www.get.expeerly.com/privacy-policy"
              className="text-grey-700 font-bold"
              aria-label={t('privacy_policy.aria_label')}
              target="_blank"
            >
              {t('privacy_policy.label')}
            </Link>

            <div className=" text-grey-500">© Expeerly AG, {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
