"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "gold", loading, children, disabled, ...props },
    ref,
  ) => {
    const baseStyles =
      "font-body tracking-widest text-xs uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center";

    const variants = {
      gold: "bg-brand-gold text-charcoal-700 px-8 py-3 font-medium hover:bg-earth-300",
      outline:
        "border border-cream-200/60 text-cream-200 px-6 py-3 font-light hover:bg-cream-200/10 hover:border-cream-200",
      ghost:
        "text-cream-200/70 hover:text-cream-100 px-4 py-2 font-light hover:bg-cream-200/5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Button loading spinner</title>
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
