import clsx from 'clsx';
import Image from 'next/image';
import React, { FunctionComponent } from 'react';

export type SlideProps = {
  icon?: JSX.Element | string;
  name?: string;
  imgURL?: string;
  id?: number | string;
};

type Props = {
  data: SlideProps;
  className?: string;
};

export const SliderCard: FunctionComponent<Props> = ({ data, className }) => {
  return (
    <button
      className={clsx(
        'h-[50px] w-max flex items-center justify-center gap-2 px-6  rounded-full border border-black  focus:outline-none focus:ring-0 whitespace-nowrap flex-shrink-0 md:px-8',
        { 'py-3': !data.imgURL },
        className
      )}
      aria-label={data?.name ?? `slide-${data?.id}`}
    >
      {data?.icon && <span className="text-lg">{data?.icon}</span>}
      {data?.name && <span className="text-sm text-gray-700">{data?.name}</span>}
      {data.imgURL && (
        <Image
          className="w-full h-max min-w-max"
          src={data.imgURL}
          width={100}
          height={25}
          alt=""
        />
      )}
    </button>
  );
};
