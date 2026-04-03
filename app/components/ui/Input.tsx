"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-body font-light text-cream-200/50 text-xs tracking-widest uppercase"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-transparent border border-cream-200/20 text-cream-100",
            "font-body font-light text-sm",
            "px-4 py-2.5",
            "outline-none transition-colors",
            "placeholder:text-cream-200/30",
            "focus:border-brand-gold/60",
            error && "border-red-400/50 focus:border-red-400/60",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="font-body font-light text-red-400 text-xs mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
