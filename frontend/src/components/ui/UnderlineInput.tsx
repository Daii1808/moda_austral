import type { InputHTMLAttributes, ReactNode } from 'react';

interface UnderlineInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inlineAction?: ReactNode;
}

/**
 * Input Field (Underline Only) — docs/DESIGN.md
 * 0px radius, transparent background, 1px Warm Cream bottom border, Warm Cream text,
 * 1px 2px padding, 36px right padding for an inline action.
 */
export function UnderlineInput({ inlineAction, className = '', ...props }: UnderlineInputProps) {
  return (
    <div className="relative inline-flex w-full items-center">
      <input
        className={`w-full rounded-none border-0 border-b border-warm-cream bg-transparent py-[1px] pl-[2px] pr-[36px] text-[12px] font-medium uppercase text-warm-cream placeholder:text-driftwood focus:outline-none ${className}`}
        {...props}
      />
      {inlineAction && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2">{inlineAction}</div>
      )}
    </div>
  );
}
