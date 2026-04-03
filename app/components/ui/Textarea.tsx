"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-body font-light text-cream-200/50 text-xs tracking-widest uppercase"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full bg-transparent border border-cream-200/20 text-cream-100",
            "font-body font-light text-sm",
            "px-4 py-2.5",
            "outline-none transition-colors resize-none",
            "placeholder:text-cream-200/20",
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

Textarea.displayName = "Textarea";
