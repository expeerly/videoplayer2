'use client';
import React, { FunctionComponent } from 'react';
import { retailerData } from './data';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const RetailerSection: FunctionComponent = () => {
  const t = useTranslations();
  return (
    <div className="w-max flex gap-4 mx-auto overflow-x-auto">
      {retailerData.map(retailer => (
        <Link
          key={retailer.id}
          target="_blank"
          aria-label={t('dynamic_texts.home_retailer_icons.aria_label', {
            partnername: retailer.name,
          })}
          href={retailer.webkitURL}
          className="h-[50px] min-w-52 w-full bg-white flex items-center justify-center rounded-full border border-black overflow-hidden focus:outline-none focus:ring-0 px-6 md:px-8"
        >
          <Image
            src={retailer.logo}
            alt={retailer.name}
            width={200}
            height={32}
            className=" h-11 "
          />
        </Link>
      ))}
    </div>
  );
};
