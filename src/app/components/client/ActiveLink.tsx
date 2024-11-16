'use client';

import { FunctionComponent, memo, PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from '@/src/i18n/routing';

type ActiveLinkProps<T> = {
  className?: string;
  label?: string;
  title?: string;
} & T;

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
