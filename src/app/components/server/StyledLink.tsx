import React, { AnchorHTMLAttributes, FunctionComponent, PropsWithChildren } from 'react';
import { BaseButtonProps } from '../client/Button/types';
import { buttonStyleClasses } from '../client/Button/style';
import Link from 'next/link';

type LinkElementProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

const ButtonContent: FunctionComponent<
  Pick<LinkElementProps, 'startContent' | 'endContent' | 'isOnlyIcon'> & PropsWithChildren
> = ({ startContent, endContent, isOnlyIcon, children }) => {
  if (isOnlyIcon) {
    return <>{children}</>;
  }

  return (
    <>
      {startContent && <span className="inline-flex shrink-0">{startContent}</span>}
      {children}
      {endContent && <span className="inline-flex shrink-0">{endContent}</span>}
    </>
  );
};

export const StyledLink: FunctionComponent<PropsWithChildren<LinkElementProps>> = ({
  variant = 'primary',
  size = 'md',
  startContent,
  endContent,
  fullWidth = false,
  isOnlyIcon = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = buttonStyleClasses({
    variant,
    size,
    className,
    fullWidth,
    isOnlyIcon,
  });
  const content = (
    <ButtonContent startContent={startContent} endContent={endContent} isOnlyIcon={isOnlyIcon}>
      {children}
    </ButtonContent>
  );

  const { href, ...linkProps } = rest;
  return (
    <Link href={href} className={classes} {...linkProps}>
      {content}
    </Link>
  );
};
