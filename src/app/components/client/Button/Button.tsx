'use client';
import React, { ButtonHTMLAttributes, FunctionComponent, PropsWithChildren } from 'react';
import { buttonStyleClasses } from './style';
import { BaseButtonProps } from './types';

// Props for button element
type ButtonElementProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonContent: FunctionComponent<
  Pick<BaseButtonProps, 'startContent' | 'endContent' | 'isOnlyIcon'> & PropsWithChildren
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

export const Button: FunctionComponent<PropsWithChildren<ButtonElementProps>> = ({
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

  return (
    <button className={classes} {...(rest as ButtonElementProps)}>
      {content}
    </button>
  );
};
