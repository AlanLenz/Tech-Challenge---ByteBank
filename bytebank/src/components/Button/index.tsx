"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { colors } from "@/hooks/useThemeColors";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-semibold transition-opacity disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        outline: "",
        destructive: "",
        ghost: "",
        neutral: "",
      },
      size: {
        sm: "px-3 py-1.5 text-[13px]",
        md: "px-4 py-2 text-[14px]",
        lg: "w-full px-4 py-3 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: colors.primary,
    color: colors.white,
  },
  secondary: {
    backgroundColor: "transparent",
    border: `2px solid ${colors.primary}`,
    color: colors.primary,
  },
  outline: {
    backgroundColor: "transparent",
    border: `1px solid ${colors.primary}`,
    color: colors.primary,
  },
  destructive: {
    backgroundColor: colors.transfer,
    color: colors.white,
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.primary,
  },
  neutral: {
    backgroundColor: "transparent",
    border: `1px solid ${colors.black}`,
    color: colors.black,
  },
};

export type ButtonVariant = "primary" | "secondary" | "outline" | "destructive" | "ghost" | "neutral";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const Comp = "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), className)}
        style={{ ...variantStyles[variant ?? "primary"], ...style }}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export default Button;
