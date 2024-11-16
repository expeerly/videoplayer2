import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { getDictionary } from '@/src/lib/dictionary';

export const Footer: FunctionComponent = async () => {
  const t = (await getDictionary()).footer;
  return (
    <footer className="w-full md:max-w-[calc(100%-25%)] mid-lg:max-w-[calc(100%-275px)] border-l ml-auto px-5 pt-8 pb-14 border-t bg-white md:pb-8">
      <div className="max-w-4xl mx-auto  pt-4 flex justify-center">
        <div className="grid gap-6   sm:grid-cols-3 grid-cols-2 w-[660px]  sm:gap-4 text-sm mb-4">
          <div className="flex flex-col gap-6">
            <Link href="#" className="text-gray-700 font-bold">
              {t.contactUs}
            </Link>
            <Link
              href="https://www.get.expeerly.com/terms-and-conditions-companies"
              className="text-gray-700 font-bold"
            >
              {t.termsCompanies}
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <Link href="https://www.get.expeerly.com/about-us" className="text-gray-700 font-bold">
              {t.aboutUs}
            </Link>
            <Link
              href="https://www.get.expeerly.com/terms-and-conditions-creators"
              className="text-gray-700 font-bold"
            >
              {t.termsReviewers}
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <Link
              href="https://www.get.expeerly.com/privacy-policy"
              className="text-gray-700 font-bold"
            >
              {t.privacyPolicy}
            </Link>

            <div className=" text-gray-500">© Expeerly AG, {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
