'use client';

import { FunctionComponent, PropsWithChildren } from 'react';
import { usePathname } from '@/src/i18n/routing';
import Link, { LinkProps } from 'next/link';

type ActiveLinkProps<T> = {
  className?: string;
  label?: string;
  title?: string;
  'aria-label'?: string;
} & Omit<T, 'locale'>;

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
      aria-label={props['aria-label']}
      className={`${className} ${
        pathname === props.href ? 'bg-grey-100 text-black' : 'text-transparent'
      } flex w-full justify-start items-center py-2 px-3 gap-2 group rounded transition-colors duration-200 hover:bg-grey-100 hover:text-black focus:ring-0`}
      {...props}
    >
      {children}
    </Link>
  );
};
