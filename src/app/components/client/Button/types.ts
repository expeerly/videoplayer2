export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Base props shared between button and link
export type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  fullWidth?: boolean;
  isOnlyIcon?: boolean;
  className?: string;
};
