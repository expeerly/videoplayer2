'use client';

import { FunctionComponent, PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type ActiveLinkProps<T> = {
  className?: string;
  label?: string;
  title?: string;
} & T;

export const ActiveLink: FunctionComponent<PropsWithChildren<ActiveLinkProps<LinkProps>>> = ({
  children,
  className,
  ...props
}) => {
  const pathname = usePathname();

  return (
    <Link
      label={props.label}
      title={props.title}
      className={`${className} ${
        pathname === props.href ? 'bg-[#F7F7F7] text-black' : 'text-transparent'
      } flex w-full justify-start items-center py-2 px-4 gap-2 group rounded transition-colors duration-200 hover:bg-[#F7F7F7] hover:text-black focus:ring-0`}
      {...props}
    >
      {children}
    </Link>
  );
};
