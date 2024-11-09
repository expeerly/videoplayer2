import React, { FunctionComponent } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  fullWidth?: boolean;
  isOnlyIcon?: boolean;
  children: React.ReactNode;
}

export const Button:FunctionComponent<ButtonProps> = ({
  variant = "primary",
  size = "md",
  startContent,
  endContent,
  fullWidth = false,
  isOnlyIcon = false,
  className = "",
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        // Base styles
        "flex items-center justify-center font-medium transition-all duration-200",
        "focus:outline-none",
        "rounded-full",
        // Variants
        {
          // Primary variant
          "bg-pink-500 text-white hover:bg-pink-600 hover:shadow-lg active:bg-pink-700 focus:ring-pink-500":
            variant === "primary",
          "disabled:bg-pink-300 disabled:hover:bg-pink-300 disabled:hover:shadow-none":
            variant === "primary",

          // Secondary variant
          "bg-pink-700 text-white hover:bg-pink-800 hover:shadow-lg active:bg-pink-900 focus:ring-pink-700":
            variant === "secondary",
          "disabled:bg-pink-500 disabled:hover:bg-pink-500 disabled:hover:shadow-none":
            variant === "secondary",

          // Outline variant
          "border-2 border-pink-500 text-pink-500 bg-transparent hover:bg-pink-50 hover:border-pink-600 hover:text-pink-600":
            variant === "outline",
          "hover:shadow-lg active:bg-pink-100 focus:ring-pink-500":
            variant === "outline",
          "disabled:border-pink-300 disabled:text-pink-300 disabled:hover:bg-transparent disabled:hover:shadow-none":
            variant === "outline",

          // Ghost variant
          "text-gray-500 bg-transparent hover:bg-gray-50 hover:text-gray-700 hover:shadow-sm":
            variant === "ghost",
          "active:bg-gray-100 focus:ring-gray-500": variant === "ghost",
          "disabled:text-gray-300 disabled:hover:bg-transparent disabled:hover:shadow-none":
            variant === "ghost",
        },

        // Sizes with icon-only support
        {
          // Regular button sizes
          "text-sm px-4 py-1.5 gap-1.5": size === "sm" && !isOnlyIcon,
          "text-base px-6 py-2 gap-2": size === "md" && !isOnlyIcon,
          "text-lg px-11 py-2 gap-2.5": size === "lg" && !isOnlyIcon,

          // Icon-only sizes (square aspect ratio)
          "p-1.5": size === "sm" && isOnlyIcon,
          "p-2": size === "md" && isOnlyIcon,
          "p-2.5": size === "lg" && isOnlyIcon,
        },

        // Width
        {
          "w-full": fullWidth && !isOnlyIcon,
        },

        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-60",

        // Additional classes
        className
      )}
      disabled={disabled}
      {...props}
    >
      {isOnlyIcon ? (
        children
      ) : (
        <>
          {startContent && (
            <span className="inline-flex shrink-0">{startContent}</span>
          )}
          {children}
          {endContent && <span className="inline-flex shrink-0">{endContent}</span>}
        </>
      )}
    </button>
  );
};