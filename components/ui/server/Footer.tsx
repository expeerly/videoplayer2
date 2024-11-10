import React, { FunctionComponent } from 'react';
import Link from 'next/link';

export const Footer: FunctionComponent = () => {
  return (
    <footer className="w-full md:w-[calc(100%-199px)] border-l ml-auto px-4 pt-8 pb-14 border-t bg-white md:pb-8">
      <div className="max-w-4xl mx-auto  pt-4 flex justify-center">
        <div className="grid gap-6   sm:grid-cols-3 grid-cols-2 w-[660px]  sm:gap-4 text-sm mb-4">
          <div className="flex flex-col gap-6">
            <Link href="#" className="text-[#0E0E0F] font-bold">
              Contact Us
            </Link>
            <Link href="#" className="text-[#0E0E0F] font-bold">
              Terms Companies
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <Link href="#" className="text-[#0E0E0F] font-bold">
              About Us
            </Link>
            <Link href="#" className="text-[#0E0E0F] font-bold">
              Terms Reviewers
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <Link href="#" className="text-[#0E0E0F] font-bold">
              Privacy Policy
            </Link>

            <div className=" text-[#8D8B94]">© Expeerly AG, {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
