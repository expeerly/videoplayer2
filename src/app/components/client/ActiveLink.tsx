'use client';

import { FunctionComponent, memo, PropsWithChildren } from 'react';
import { Link, usePathname } from '@/src/i18n/routing';
import { LinkProps } from 'next/link';

type ActiveLinkProps<T> = {
  className?: string;
  label?: string;
  title?: string;
  'aria-label'?: string;
} & Omit<T, 'locale'>;

const ActiveLinkComponent: FunctionComponent<PropsWithChildren<ActiveLinkProps<LinkProps>>> = ({
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
        pathname === props.href ? 'bg-light-gray text-black' : 'text-transparent'
      } flex w-full justify-start items-center py-2 px-3 gap-2 group rounded transition-colors duration-200 hover:bg-light-gray hover:text-black focus:ring-0`}
      {...props}
    >
      {children}
    </Link>
  );
};

export const ActiveLink = memo(ActiveLinkComponent);
